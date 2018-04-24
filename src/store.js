/* eslint-disable */
import { promiseMiddleware } from './middleware'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import auth from './reducers/auth'
import common from './reducers/common'
import home from './reducers/home'


// import { composeWithDevTools } from 'redux-devtools-extension';


const defaultState = { appName: 'social net', articles: null }

const reducer = combineReducers({
	auth,
	common,
	home
})

// const devTools = composeWithDevTools()

const store = createStore(reducer,
	applyMiddleware(promiseMiddleware))

export default store
