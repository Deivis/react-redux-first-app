import * as types from './actionTypes';

//COMMENTS ACTIONS

//Increment action
export const increment = (index) =>({
	type: types.INCREMENT_LIKES,
	index
});

//Add comment if is possible
export const addCommentIfCan = (postId, author, comment, origin) => {

	return (dispatch, getState) => {
		if(canAddComment(getState())){
			dispatch(postComment(postId));
	   	return addComment(dispatch, { postId, author, comment }, origin);
    }
  }
};

//Trigger a fetch call to save a comment into the server
const addComment = (dispatch, comment, origin) => {
	origin = origin || '';
	const uri = `${origin}/comments/${comment.postId}`;

	return window.fetch(uri,
						{
 		 					method:'POST',
 							body: JSON.stringify( comment )
 						})
	      .then(response => response.json())
	      .then(json => dispatch(receivePostedComment(comment.postId, json)));
}

//Validates if a comment can be added
const canAddComment = (state) => {

	return !state.isFetching;
}

//Remove comment if is possible
export const removeComment = (postId, index, origin) => {

	return (dispatch, getState) => {

		if(canRemoveComment(getState(), index)){

			dispatch(deleteComment(postId, index));

	   	return deleteCommentFromServer(dispatch, postId, index, origin);
    }
  }
};

// Remove comment
export const deleteComment = (postId, index) => ({
	type: types.REMOVE_COMMENT,
	postId,
	index
});

// Trigger a fetch call to delete the comment from the server
const deleteCommentFromServer = (dispatch, postId, index, origin) =>{
	origin = origin || '';
	const uri = `${origin}/comments/${postId}/${index}`;

	return	window.fetch(uri,
											{
					 		 					method:'DELETE'
					 						})
					    	.then(response => response.json())
					      .then(json => dispatch(receiveRemovedCommentIndex(postId, json)));
}

//Receive the removed comment old index
const receiveRemovedCommentIndex = (postId,index) =>({
	type: types.RECEIVE_REMOVED_COMMENT,
	postId,
	index,
	confirmedAt:Date.now()
});

// validates if the state is not fetching and if the comment exists
const canRemoveComment = (state, commentIndex) => !state.isFetching && !!(state.comments.items[commentIndex]);

//Fetch the comment from server
const fetchComments = (postId, origin) => {
	origin = origin || '';
	const uri = `${origin}/comments/${postId}`;

  return dispatch => {
    dispatch(requestComments(postId));
    return window.fetch(uri)
						      .then(response => response.json())
						      .then(json => dispatch(receiveComments(postId, json)));
  }
}

//Validates if is possible fetch comments
const shouldFetchComments = (state, postId) =>{
  const comments = state.comments;
  if (( comments && comments.items && comments.items[postId] ) || comments.isFetching) {
    return false;
  }
  return true;
}

//Fetch comments if is necessery
export const fetchCommentsIfNeeded = (postId, origin) => {
	return (dispatch, getState) => {
    if (shouldFetchComments(getState(), postId)) {
      return dispatch(fetchComments(postId, origin));
    }
  }
}

//Request the comments of a post to the server
export const requestComments =(postId) =>({
	type: types.REQUEST_COMMENTS,
	postId
});

//Receive the comments of a post from the server
export const receiveComments =(postId, json) =>({
	type: types.RECEIVE_COMMENTS,
	postId,
	comments: json,
	receivedAt: Date.now()
});

// POSTS ACTIONS

//Indicates a post were posted to the server
export const postComment = (postId) =>({
	type: types.POST_COMMENT
})

//Receive the comments of a post from the server
export const receivePostedComment =(postId, json) =>({
	type: types.RECEIVE_POSTED_COMMENT,
	postId,
	author: json.author,
	comment: json.comment,
	receivedAt: Date.now()
});

//Request the posts to the server
export const requestPosts =() =>({
	type: types.REQUEST_POSTS
});

//Receive the posts from the server
export const receivePosts =(json) =>({
	type: types.RECEIVE_POSTS,
	posts: json,
	receivedAt: Date.now()
});

//Fetch the posts from server
const fetchPosts = () => {
  return dispatch => {
    dispatch(requestPosts());
    return window.fetch('/posts')
						      .then(response => response.json())
						      .then(json => dispatch(receivePosts(json)));
  }
}

//Validates if is possible fetch posts
const shouldFetchPosts = (state, action) => {
  const posts = state.posts;
  if (( posts && posts.items && posts.items.length > 0 ) || posts.isFetching) {
    return false
  }
  return true;
}

//Fetch posts if is necessery
export const fetchPostsIfNeeded = () => {
	return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  }
}
