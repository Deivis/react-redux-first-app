import React, {Component, PropTypes} from 'react';

import Photo from './Photo';

import Comments from './Comments';

class Single extends Component {  

	componentDidMount() {
		let {fetchCommentsIfNeeded, params} = this.props;
		let {postId} = params;		
    fetchCommentsIfNeeded(postId);
  }

	render() {
		const { params, posts, comments, addCommentIfCan, removeComment, increment } = this.props;
		let postId = params.postId;
		let i = posts.items.reduce((pp,cp,idx)=>{ return pp || (cp.code === postId ? idx : pp ); }, null);
		let postComments = comments && comments.items ? comments.items : [];
		let post = posts.items[i] || {}; 
		
		return (
			<div className="single-photo">		

				<Photo index={i} post={post} comments={postComments} increment={increment} isIncrementingLikes={posts.isIncrementingLikes} />

				<Comments postId={postId} comments={postComments} addComment={addCommentIfCan} isFetching={comments.isFetching} removeComment={removeComment} />
				
			</div>
		);
	}
};

Single.propTypes = {
	addComment: PropTypes.func,
	comments: PropTypes.object,
  fetchCommentsIfNeeded: PropTypes.func,
  increment: PropTypes.func,
  posts: PropTypes.object,
  params: PropTypes.object, 
  removeComment:  PropTypes.func  
}

export default Single; 