/* eslint-disable */
import { promiseMiddleware } from './middleware'
import { applyMiddleware, createStore } from 'redux'

// import { composeWithDevTools } from 'redux-devtools-extension';


const defaultState = { appName: 'social net', articles: null }

const reducer = function(state = defaultState, action) {
	switch(action.type) {
		case 'HOME_PAGE_LOADED':
			return { ...state, articles: action.payload.articles }
	}
	return state
}

// const devTools = composeWithDevTools()

const store = createStore(reducer,
	applyMiddleware(promiseMiddleware))

export default store
