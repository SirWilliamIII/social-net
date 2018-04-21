/* eslint-disable */
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'

const defaultState = { appName: 'social net', articles: null }

const reducer = (state = defaultState, action) => {
	return state
}

const store = createStore(reducer)


ReactDOM.render((
	<Provider store={ store }>
		<App />
	</Provider>
), document.getElementById('root'))
