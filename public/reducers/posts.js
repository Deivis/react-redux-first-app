//A reducer takes in 3 things:

//1. The action(info about what happened)
//2. Copy of current state
//3. Return the state

const posts = (state=[], action) => {
		console.log('state ', state);
		console.log('action ',action);
		return state;
};

export default posts;