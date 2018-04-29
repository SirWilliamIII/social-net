import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://conduit.productionready.io/api'

// const API_ROOT = 'http://localhost:3000'

let token = null
let tokenPlugin = req => {
	if(token) {
		req.set('authorization', `Token ${token}`)
	}
}

const requests = {
	get:  url =>
		      superagent.get(`${API_ROOT}${url}`)
			      .use(tokenPlugin)
			      .then(res => res.body),
	post: (url, body) =>
		      superagent.post(`${API_ROOT}${url}`, body)
			      .use(tokenPlugin)
			      .then(res => res.body),
	put:  (url, body) => {
		superagent.put(`${API_ROOT}${url}`, body)
			.use(tokenPlugin)
			.then(res => res.body)
	}
}


const Articles = {
	all: page =>
		     requests.get(`/articles?limit=10`)
}


const Auth = {
	current:  () => requests.get('/user'),
	login:    (email, password) =>
		          requests.post('/users/login', { user: { email, password } }),
	register: (username, email, password) =>
		          requests.post('/users', { user: { username, email, password } }),
	save:     user => requests.put('/user', { user })
}


export default {
	Articles,
	Auth,
	setToken: _token => {
		token = _token;
	}
}
