import {createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk';

//Import the root reducer
import rootReducer from './reducers/index';

//Create an object for the default data
const defaultState = {
	posts: {
		isFetching: false,
		items:[]
	},
	comments:{
		isFetching: false,
		items: []
	}
};

//Extension which provides a connection whith the redux chrome dev tools 
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunkMiddleware),devTools));

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