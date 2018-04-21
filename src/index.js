/* eslint-disable */
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { promiseMiddleware } from './middleware'

import App from './App'

const defaultState = { appName: 'social net', articles: null }

const reducer = function(state = defaultState, action) {
	switch(action.type) {
		case 'HOME_PAGE_LOADED':
			return { ...state, articles: action.payload.articles }
	}
	return state
}

const store = createStore(reducer, applyMiddleware(promiseMiddleware))


ReactDOM.render((
	<Provider store={ store }>
		<App />
	</Provider>
), document.getElementById('root'))
