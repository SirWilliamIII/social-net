import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://conduit.productionready.io/api'

// const API_ROOT = 'http://localhost:3000'
const requests = {
	get:  url =>
		      superagent.get(`${API_ROOT}${url}`)
			      .then(res => res.body),
	post: (url, body) =>
		      superagent.post(`${API_ROOT}${url}`, body)
			      .then(res => res.body)
}


const Articles = {
  all: page =>
    requests.get(`/articles?limit=10`)
}


const Auth = {
	current: () => requests.get('/user'),

	login: (email, password) =>
		       requests.post('/users/login', { user: { email, password } })

}


export default {
	Articles,
	Auth
}
