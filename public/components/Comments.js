import React from 'react';

const renderComment = (comment,index) =>  (
		<div className="comment" key={index}>
			<p>
				<strong>{comment.user}</strong>
				{comment.text}
				<button className="remove-comment">&times;</button>
			</p>
		</div>
);

const Comments = ({comments}) => ( 
	<div className="comments">
		{ comments.map(renderComment) }
		<form ref="commentForm" className="comment-form">
			<input type="text" ref="author" placeholder="author" />
			<input type="text" ref="comment" placeholder="comment" />
			<input type="submit" hidden />
		</form>
	</div>
);

export default Comments;