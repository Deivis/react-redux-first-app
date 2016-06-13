import { ADD_COMMENT, REMOVE_COMMENT } from '../actions/actionTypes';

const comments = (state=[], action) => {
		if(typeof action.postId !== 'undefined'){
			
			return Object.assign({},		
				//current state
				state,		
				// overwrite this post with a new one
				{ [action.postId]: postComments(state[action.postId],action) }
			);
		}

		return state;
};

const postComments = (state=[], action) => {
		switch(action.type){
			case ADD_COMMENT:

			// return the new state with the new comment
				return [
					...state,
					{
						user: action.author,
						text: action.comment
					}
				];

			case REMOVE_COMMENT:

			// return the new state without the removed comment
				return [

				// from the start to the comment which we want to delete
					...state.slice(0,action.index),
					...state.slice(action.index + 1)
				];

			default:

				return state;
		}		
};

export default comments;