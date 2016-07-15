import { ADD_COMMENT, REMOVE_COMMENT, RECEIVE_COMMENTS, REQUEST_COMMENTS,POST_COMMENT, RECEIVE_POSTED_COMMENT, RECEIVE_REMOVED_COMMENT } from '../actions/actionTypes';

const comments = (state= {
		isFetching: false,
		items: []
	}, action) => {
		switch(action.type){

			case POST_COMMENT:
				return Object.assign({}, state, {
					isFetching: true
				});

			case RECEIVE_POSTED_COMMENT:
				// return the new state with the new comment received from the server
				return Object.assign({},
					state,
					{
						isFetching: false,
						items:
					  [...state.items,
							{
								user: action.author,
								text: action.comment
							}
						],
						lastUpdated: action.receivedAt
					}
				);

			case REMOVE_COMMENT:
				// return the new state without the removed comment
				return Object.assign({},
					state,
					{
						items:[

						// from the start to the comment which we want to delete
						...state.items.slice(0,action.index),
						...state.items.slice(action.index + 1)
						]
					}
				);

			case RECEIVE_REMOVED_COMMENT:

				return Object.assign({}, state, {
					index: action.index,
					postId: action.postId,
					confirmadAt: action.confirmedAt
				});

			case REQUEST_COMMENTS:

				// return a state which don't have data but have the attribute isFetching.
				return Object.assign({}, state, {
					isFetching: true
				});

			case RECEIVE_COMMENTS:

				//Receive the comments from the server
				return Object.assign({}, state, {
					isFetching: false,
					items: action.comments,
					lastUpdated: action.receivedAt
				});

			default:

				return state;
		}
};

export default comments;
