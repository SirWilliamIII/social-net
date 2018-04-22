import React from 'react'


const ArticlePreview = props => {
	const article = props.article
	return (
		<div className="article-preview">
			<div className="article-meta">
				<a href=""> <img src={ article.author.image } alt=""/>
				</a>
				<div className="info">
					<a className="author">
						{ article.author.username }
					</a>
					<span className="date">
						{ new Date(article.createdAt).toDateString() }
					</span>
				</div>
				<div className="pull-xs-right">
					<button className="btn btn-sm btn-outline-primary">
						<i className="ion-heart"></i> { article.favoritesCount }
					</button>
				</div>
			</div>
			<a href="" className="preview">
				<h1>{ article.title }</h1>
				<p>{ article.description }</p>
				<span> Read More ...</span>
				<ul className="tag-list">
					{
						article.taglist.map(tag => {
							return (
								<li className="tag-default tag-pill tag-outline" key={tag}>
									{ tag }
								</li>
							)
						})
					}
				</ul>
			</a>
		</div>
	)
}

export default ArticlePreview