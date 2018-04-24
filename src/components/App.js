import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
// import Home from './Home'



const mapStateToProps = state => ({ appName: state.appName })

class App extends Component {
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

export default connect(mapStateToProps, () => ({}))(App)
