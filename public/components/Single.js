import React from 'react';

import Photo from './Photo';

import Comments from './Comments';

const Single = ({posts, params, comments, increment, addComment, removeComment}) => {
	const postId = params.postId;
	let i = posts.reduce((pp,cp,idx)=>{ return pp || (cp.code === postId ? idx : pp ); }, null);
	const post = posts[i];
	const postComments = comments[postId] || [];
	
	return (
		<div className="single-photo">		

			<Photo index={i} post={post} comments={comments} increment={increment} />

			<Comments comments={postComments} params={params} addComment={addComment} removeComment={removeComment} />
			
		</div>
	);
};

export default Single;

 