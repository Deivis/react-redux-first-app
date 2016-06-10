import React from 'react';

const Comments = React.createClass({
	renderComment(postId, comment,index){
		
		return(
			<div className="comment" key={index}>

				<p>

					<strong>{comment.user}</strong>

					{comment.text}

					<button className="remove-comment" onClick={ this.props.removeComment.bind(null, postId,index) } >&times;</button>

				</p>

			</div>
		)
	},

	handleSubmit(postId, e){
		e.preventDefault();
	 	const author = this.refs.author.value;
	 	const comment = this.refs.comment.value;
	 	this.props.addComment(postId,author,comment);
	 	this.refs.commentForm.reset();
	},

	render(){
		const {postId} = this.props.params;
		
		return( 
			<div className="comments">

				{ this.props.comments.map(this.renderComment.bind(this,postId)) }

				<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this,postId)}>

					<input type="text" ref="author" placeholder="author" />

					<input type="text" ref="comment" placeholder="comment" />

					<input type="submit" hidden />

				</form>
				
			</div>
		);
	}
});

export default Comments;