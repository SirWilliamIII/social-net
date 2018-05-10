import agent from './agent'

const promiseMiddleware = store => next => action => {
	if(isPromise(action.payload)) {
		store.dispatch({ type: 'ASYNC_START', subtype: action.type })
		action.payload
			.then(res => {
				console.log('YES!')
				action.payload = res
				store.dispatch(action)
			},
			error => {
				action.error = true
				action.payload = error.response.body
				store.dispatch(action)
			}
		)
		return
	}
	next(action)
}

function isPromise(v) {
	return v && typeof v.then === 'function'
}

const localStorageMiddleware = store => next => action => {

	if(action.type === 'REGISTER' || action.type === 'LOGIN') {
		if(!action.error) {
			console.log('NO ERROR')
			window.localStorage.setItem('jwt', action.payload.text.user.token);
			agent.setToken(action.text.payload.user.token);
		}
	} else if(action.type === 'LOGOUT') {
		window.localStorage.setItem('jwt', '');
		agent.setToken(null);
	}
	console.log(`action.payload: ${action.payload}`)
	next(action);
};


export { localStorageMiddleware, promiseMiddleware }
