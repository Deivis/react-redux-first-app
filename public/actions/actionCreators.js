import * as types from './actionTypes';

//Increment action
export const increment = (index) =>({
	type: types.INCREMENT_LIKES,
	index
});

//Add comment
export const addCommentIfCan = (postId, author, comment) => {

	return (dispatch, getState) => {
		if(canAddComment(getState())){
	    addComment(dispatch, { postId, author, comment });
	   	return dispatch(postComments(postId));
    }
  }
};

const addComment = (dispatch, comment) => {

	return fetch(`/comments/${comment.postId}`,
						{ 
 		 					method:'POST', 
 							body: JSON.stringify( comment )
 						})
	      .then(response => response.json())
	      .then(json => dispatch(receivePostedComment(comment.postId, json)));
}

const canAddComment = (state) => {

	return !state.isFetching;
}

export const postComments = (postId) =>({
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

//Remove comment
export const removeComment = (postId, index) => {

	return (dispatch, getState) => {
		if(canRemoveComment(getState(), index)){
	   
	    deleteComment(dispatch, postId, index);
	   	
	   	return dispatch({
				type: types.REMOVE_COMMENT,
				postId, 
				index	   		
	   	});
    }
  }
};

const deleteComment = (dispatch, postId, index) =>{

	return fetch(`/comments/${postId}`,
						{ 
 		 					method:'DELETE', 
 							body: index
 						})
	      .then(response => response.json())
	      .then(json => dispatch(receiveRemovedCommentIndex(postId, json)));
}


const receiveRemovedCommentIndex = (postId,index) =>({
	type: types.RECEIVE_REMOVED_COMMENT,
	postId, 
	index,
	confirmedAt:Date.now()
});

const canRemoveComment = (state, commentIndex) => !state.isFetching && state.comments.items[commentIndex];

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

const fetchPosts = () => {
  return dispatch => {
    dispatch(requestPosts());
    return fetch('/posts')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  }
}

const fetchComments = (postId) => {
  return dispatch => {
    dispatch(requestComments(postId));
    return fetch(`/comments/${postId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(postId, json)));
  }
}

function shouldFetchPosts(state, action) {
  const posts = state.posts;
  if (( posts && posts.items && posts.items.length > 0 ) || posts.isFetching) {
    return false
  }
  return true;
}

const shouldFetchComments = (state, postId) =>{
  const comments = state.comments;
  if (( comments && comments.items && comments.items[postId] ) || comments.isFetching) {
    return false;
  }
  return true;  
}

export const fetchPostsIfNeeded = () => {
	return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  }
}

export const fetchCommentsIfNeeded = (postId) => {
	return (dispatch, getState) => {
    if (shouldFetchComments(getState(), postId)) {
      return dispatch(fetchComments(postId));
    }
  }
}
