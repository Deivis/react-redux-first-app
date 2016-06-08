//Increment action
const increment = (index) =>({
	type:'INCREMENT_LIKES',
	index
});

//Add comment
const addComment = (postId, author, comment) =>({
	type:'ADD_COMMENT',
	postId, 
	author, 
	comment
});


//Remove comment
const removeComment = (postId, i) =>({
	type:'REMOVE_COMMENT',
	postId, 
	i
});