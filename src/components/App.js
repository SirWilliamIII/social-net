/* eslint-disable */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import Header from './Header'
import Home from './Home'



const mapStateToProps = state => ({
	appName:    state.common.appName,
	currentUser: state.common.currentUser,
	redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
	onLoad: (payload, token) =>
		dispatch({ type: 'APP_LOAD', payload, token }),
	onRedirect: () =>
		dispatch({ type: 'REDIRECT' })
});

class App extends Component {
	componentWillReceiveProps(nextProps) {
		if(nextProps.redirectTo) {
			this.context.router.replace(nextProps.redirectTo);
			this.props.onRedirect();
		}
	}

	render() {
		return (
			<div>
				<Header appName={ this.props.appName }/>
				{ this.props.children }
			</div>
		)
	}
}

App.contentTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
