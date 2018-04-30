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

const body = res => res.body

const requests = {
	get:  url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(body),
	post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(body),
	put:  (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(body),
	del:  url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(body)
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`

const Articles = {
	all:         page => requests.get(`/articles?${limit(10, page)}`),
	get:         slug => requests.get(`/articles/${slug}`),
	del:         slug => requests.del(`/articles/${slug}`),
	byAuthor:    (author, page) => requests.get(`/articles?author=${ encodeURIComponent(author)}&${limit(10, page)}`),
	favoritedBy: (author, page) => requests.get(`/articles?favorited=${ encodeURIComponent(author)}&${limit(10, page)}`),
	feed:        page => requests.get(`/articles/feed?${limit(10, page)}`),
	byTag:       (tag, page) => requests.get(`/articles?tag=${ encodeURIComponent(tag)}&${limit(10, page)}`),
	update: article => requests.put(`/articles/${article.slug}`, { article: Object.assign({}, article, { slug: undefined })}),
	create: article => requests.post('/articles', { article })
}

const Auth = {
	current:  () => requests.get('/user'),
	login:    (email, password) => requests.post('/users/login', { user: { email, password } }),
	register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
	save:     user => requests.put('/user', { user })
}

const Comments = {
	forArticle: slug => requests.get(`/articles/${slug}/comments`),
	create:     (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
	delete:     (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`)
}

const Profile = {
	follow:   username => requests.post(`/profiles/${username}/follow`),
	get:      username => requests.get(`/profiles/${username}`),
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
