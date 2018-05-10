/* eslint-disable */
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

import auth from './reducers/auth'
import common from './reducers/common'
import home from './reducers/home'
import settings from './reducers/settings'
import article from './reducers/article'
import articleList from './reducers/articleList'
import profile from './reducers/profile'
import editor from './reducers/editor'

import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
	article,
	articleList,
	auth,
	common,
	home,
	settings,
	profile,
	editor
})

// const devTools = composeWithDevTools()

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, composeWithDevTools(middleware))

export default store
