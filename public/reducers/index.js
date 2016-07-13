// Here we will combine all reducers in only one
//React/redux things
import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

//Our reducers
import posts from './posts';

import comments from './comments';

//Here we use the combineReducers method to create the "master" reducer
const rootReducer = combineReducers({posts,comments, routing: routerReducer});

export default rootReducer;
