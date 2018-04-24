import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
	render() {
		return (
			<div className="auth-page">
				<div className="container page">
					<div className="row">
						<div className="col-md-6 offset-md-3 col-xs-12">
							<h1 className="text-xs-center">
								Sign In
							</h1>
							<p className="text-xs-center">
								<a href="">
									Need account?
								</a>
							</p>
							<form action="">
								<fieldset className="form-group">
									<input className="form-control form-control-lg" type="email" placeholder="Email"/>
									<input type="password" className="form-control form-control-lg" placeholder="Password"/>
								</fieldset>
								<button className="btn btn-lg btn-primary pull-xs-right" type="submit">Sign In</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(() => ({}), () => ({}))(Login)
