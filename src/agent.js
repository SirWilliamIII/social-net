import _superagent from 'superagent'
import superagentPromise from 'superagent-promise'


const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'https://localhost:4000'

const requests = { get: url => superagent.get(`${API_ROOT}${url}`).then(res => res.body) }

const Articles = { all: page => requests.get('/articles') }

export default { Articles }
