import { INCREMENT_LIKES, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/actionTypes';

//A reducer takes in 3 things:

//1. The action(info about what happened)
//2. Copy of current state
//3. Return the state

const posts = (state={
	isFetching: false,
  items: []
}, action) => {
		switch(action.type){    	
    	case REQUEST_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true
	      });

    	case RECEIVE_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        items: action.posts,
	        lastUpdated: action.receivedAt
	      });

			case INCREMENT_LIKES:
				let i = action.index;
				let newState = Object.assign({}, state, { items:[
					...state.items.slice(0,i),
					Object.assign({}, state.items[i],{likes: state.items[i].likes + 1}),
					...state.items.slice(i + 1)
				]});

				return newState;

			default:

				return state;
		}		
};

export default posts;