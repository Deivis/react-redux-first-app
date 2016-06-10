import{ INCREMENT_LIKES, ADD_COMMENT, REMOVE_COMMENT } from './actionTypes';

//Increment action
export const increment = (index) =>({
	type: INCREMENT_LIKES,
	index
});

//Add comment
export const addComment = (postId, author, comment) =>({
	type:ADD_COMMENT,
	postId, 
	author, 
	comment
});

//Remove comment
export const removeComment = (postId, index) =>({
	type:REMOVE_COMMENT,
	postId, 
	index
});