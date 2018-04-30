import React from 'react'
import { Link } from 'react-router'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import ListErrors from '../ListErrors'


const CommentContainer = props => {
console.log('////////////////////')
	console.log(props)
	console.log('////////////////////')
	if(props.currentUser) {
		return (
			<div className="col-xs-12 col-md-8 offset-md-2">
				<div>
					<ListErrors errors={ props.errors }/>
					<CommentInput
						slug={ props.slug }
						currentUser={ props.currentUser }/>
				</div>
				<CommentList
					comments={ props.comments }
					slug={ props.slug }
					currentUser={ props.currentUser }/>
			</div>
		)
	} else {
		return (
			<div className="col-xs-12 col-md-8 offset-md-2">
				<p>
					<Link to="login">Sign in</Link><Link
					to="register">sign up</Link>&nbspto; add comments on this article.
				</p>

				<CommentList
					comments={ props.comments }
					slug={ props.slug }
					currentUser={ props.currentUser }/>
			</div>
		)
	}
}

export default CommentContainer
