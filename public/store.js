import {createStore, compose} from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//Import the root reducer
import rootReducer from './reducers/index';

//Import static data
import comments from './data/comments';
import posts from './data/posts';

//Create an object for the default data
const defaultState = {
	posts,
	comments
};

//Extension which provides a connection whith the redux chrome dev tools 
const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory,store);

//this is a functionality of webpack and its modules
if(module.hot){
	module.hot.accept('./reducers/', ()=>{

		// this is used the commonJs sintax because the ES6 modules can't be loded inside of a funciton
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;