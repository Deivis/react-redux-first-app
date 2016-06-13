import comments from '../../public/reducers/comments';

import * as actions from '../../public/actions/actionCreators';

import expect  from 'expect';


describe('comments reducer: ', () => {
	const initialState = {
	  BAhvZrRwcfu:[
	    {
	      text:'Totally need to try this.',
	      user:'heavymetaladam'
	    }
	  ]
	};	
	const postId = 'BAhvZrRwcfu';
	const author = 'test';
	const comment = 'xuxu';
	let action;
	let expectedState;

	it('Should add a comment and return a new state', () => {
		expectedState = {};
		expectedState[postId] = [ ...initialState[postId], { text: comment, 'user':author  }];
		action = actions.addComment(postId, author, comment);

		expect(comments(initialState, action))
			.toEqual(expectedState);
	});

	it('Should remove a comment and return a new state', () => {
		expectedState = {}
		expectedState[postId] = [];
		action = actions.removeComment(postId,0);

		expect(comments(initialState, action))
			.toEqual(expectedState);
	});

});