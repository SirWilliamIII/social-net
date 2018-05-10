import React from 'react'
import ArticlePreview from './ArticlePreview'
import ListPagination from './ListPagination'

const ArticleList = props => {
	if(!props.articles) {
		return <div className="article-preview">Loading...</div>
	}
	if(props.articles.length === 0) {
		return <div className="article-preview">No articles here...</div>
	}

	return (
		<div>
			{
				props.articles.map((article, key) => (
					<ArticlePreview article={ article } key={ key } />
				))
			}
			<ListPagination
				articlesCount={ props.articlesCount }
				currentPage={ props.currentPage }
				onSetPage={ props.onSetPage }/>
		</div>
	)
}

export default ArticleList
