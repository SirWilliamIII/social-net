import React from 'react'
import ArticlePreview from './ArticlePreview'

const ArticleList = props => {
	console.log(`HELLO!! Props: ${props[0]}`)
	if (!props.articles) {
		return <div className="article-preview">Loading...</div>
	}
	if (props.articles.length === 0) {
		return <div className="article-preview">No articles here...</div>
	}

	return (
		<div>
			{props.articles.map(article => (
				<ArticlePreview articles={article} />
			))}
		</div>
	)
}

export default ArticleList
