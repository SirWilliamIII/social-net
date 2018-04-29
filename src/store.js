/* eslint-disable */
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

import auth from './reducers/auth'
import common from './reducers/common'
import home from './reducers/home'
import settings from './reducers/settings'
import article from './reducers/article'

// import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
	auth,
	common,
	home,
	settings
})

// const devTools = composeWithDevTools()

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store
