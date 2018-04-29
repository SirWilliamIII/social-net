import React, { Component } from 'react'
import { connect } from 'react-redux'
import Banner from './Banner'
import MainView from './MainView'
import agent from '../../agent'
import Tags from './Tags'

const Promise = global.Promise

const mapStateToProps = state => ({
	...state.home,
	appName: state.common.appName,
	token:   state.common.token
})

const mapDispatchToProps = dispatch => ({
	onLoad:   (tab, payload) => dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
	onUnload: () => dispatch({ type: 'HOME_PAGE_UNLOADED' }),
	onClickTag: (tag, payload) => dispatch({ type: 'APPLY_TAG_FILTER', tag, payload })
})

class Home extends Component {
	componentWillMount() {
		const tab = this.props.token ? 'feed' : 'all';
		const articlesPromise = this.props.token ?
			agent.Articles.feed() :
			agent.Articles.all();
		this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]))
	}

	render() {
		return (
			<div className="home-page">
				<Banner token={ this.props.token } appName={ this.props.appName } />
				<div className="container page">
					<div className="row">
						<MainView />
						<div className="col-md-3">
							<div className="sidebar">
								<p>Popular-ass Tags</p>
								<Tags
									tags={ this.props.tags }
									onClickTag={ this.props.onClickTag } />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
