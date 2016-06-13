import expect  from 'expect';

import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import posts from '../../public/reducers/posts';

import comments from '../../public/reducers/comments';

describe('combiner reducer: ', () => { 
	const combiendReducer = combineReducers({posts,comments, routing: routerReducer});

	it('shoud the combination of all reducer return a new reducer', () => {

		expect(combiendReducer).toExist();
	});

	it('shoud the combination of all reducer be a function', () => {

		expect(combiendReducer).toBeAn('function');
	});	
});