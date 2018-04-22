import React from 'react'
import ArticlePreview from './ArticlePreview'

const ArticleList = props => {
	if (!props.articles) {
		return <div className="article-preview">Loading...</div>
	}
	if (props.articles.length === 0) {
		return <div className="article-preview">No articles here...</div>
	}

	return (
		<div>
			{props.articles.map(article => (
				<ArticlePreview article={article} />
			))}
		</div>
	)
}

export default ArticleList
