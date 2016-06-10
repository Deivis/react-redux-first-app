import { INCREMENT_LIKES } from '../actions/actionTypes';

//A reducer takes in 3 things:

//1. The action(info about what happened)
//2. Copy of current state
//3. Return the state

const posts = (state=[], action) => {
		switch(action.type){
			case INCREMENT_LIKES:
				let i = action.index;

				return [
					...state.slice(0,i),
					{...state[i], likes: state[i].likes + 1},
					...state.slice(i + 1)
				];

			default:

				return state;
		}		
};

export default posts;