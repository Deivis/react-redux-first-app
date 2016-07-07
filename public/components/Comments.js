import React, {Component, PropTypes} from 'react';

class Comments extends Component {

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
	}

	handleSubmit(postId, e){
		e.preventDefault();
	 	const author = this.refs.author.value;
	 	const comment = this.refs.comment.value;
	 	this.props.addComment(postId,author,comment);
	 	this.refs.commentForm.reset();
	}

	render(){
		const postId = this.props.postId;
		const {comments, isFetching, fetchPostsIfNeeded} = this.props;	
		let overlayClass = isFetching ? 'comment-overlay' : 'invisible';

		return( 
			<div className="comments">

				{ comments.map(this.renderComment.bind(this,postId)) }

				<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit.bind(this,postId)}>
				
				<span  className={overlayClass} >
					<span className="comment-overlay-loading"></span>
				</span>

					<input type="text" ref="author" placeholder="author" />

					<input type="text" ref="comment" placeholder="comment" />

					<input type="submit" hidden />

				</form>
				
			</div>
		);
	}
};

Comments.propTypes = {
	addComment: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  removeComment:  PropTypes.func.isRequired
}

export default Comments;