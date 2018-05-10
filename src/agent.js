import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:8000/api'

// const API_ROOT = 'https://protected-shore-15700.herokuapp.com/api'

// let tokenPlugin = requests => {
// 	if(token) {
// 		console.log('token!')
// 		requests.set('Authorization', `Token ${token}`)
// 	}
// 	console.log('NO token!')
// }

const body = res => res.body
let token = null
const requests = {
	get: url =>
		superagent
			.get(`${API_ROOT}${url}`)
			.set('Authorization', `Token ${token}`)
			.then(body),
	post: (url, body) =>
		superagent
			.post(`${API_ROOT}${url}`, body)
			.set('Authorization', `Token ${token}`)
			.set('Accept', 'application/json')
			.then(body),
	put: (url, body) =>
		superagent
			.put(`${API_ROOT}${url}`, body)
			.set('Authorization', `Token ${token}`)
			.then(body),
	del: url =>
		superagent
			.del(`${API_ROOT}${url}`)
			.set('Authorization', `Token ${token}`)
			.then(body)
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`

const Articles = {
	all: page => requests.get(`/articles?${limit(10, page)}`),
	get: slug => requests.get(`/articles/${slug}`),
	del: slug => requests.del(`/articles/${slug}`),
	byAuthor: (author, page) =>
		requests.get(
			`/articles?author=${encodeURIComponent(author)}&${limit(10, page)}`
		),
	favoritedBy: (author, page) =>
		requests.get(
			`/articles?favorited=${encodeURIComponent(author)}&${limit(
				10,
				page
			)}`
		),
	feed: page => requests.get(`/articles/feed?${limit(10, page)}`),
	byTag: (tag, page) =>
		requests.get(
			`/articles?tag=${encodeURIComponent(tag)}&${limit(10, page)}`
		),
	update: article =>
		requests.put(`/articles/${article.slug}`, {
			article: Object.assign({}, article, { slug: undefined })
		}),
	create: article => requests.post('/articles', { article })
}

const Auth = {
	current: () => requests.get('/user'),
	login: (email, password) =>
		requests.post('/users/login', { user: { email, password } }),
	register: (username, email, password) =>
		requests.post('/users', { user: { username, email, password } }),
	save: user => requests.put('/user', { user })
}

const Comments = {
	forArticle: slug => requests.get(`/articles/${slug}/comments`),
	create: (slug, comment) =>
		requests.post(`/articles/${slug}/comments`, { comment }),
	delete: (slug, commentId) =>
		requests.del(`/articles/${slug}/comments/${commentId}`)
}

const Profile = {
	follow: username => requests.post(`/profiles/${username}/follow`),
	get: username => requests.get(`/profiles/${username}`),
	unfollow: username => requests.del(`/profiles/${username}/follow`)
}

const Tags = {
	getAll: () => requests.get('/tags')
}

export default {
	Articles,
	Auth,
	Comments,
	Profile,
	Tags,
	setToken: _token => {
		token = _token
	}
}
