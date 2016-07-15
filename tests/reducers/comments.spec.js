import comments from '../../public/reducers/comments';

import * as actions from '../../public/actions/actionCreators';

import expect  from 'expect';


describe('comments reducer: ', () => {
	const initialState = {
		isFetching:false,
	  items:[
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
		expectedState = {
			isFetching: false,
		  items: [ ...initialState.items,
				{ text: comment, 'user':author }
		  ],
			lastUpdated: Date.now()
		};

		action = actions.addCommentIfCan(postId, author, comment);

		expect(comments(initialState, action))
			.toNotEqual(expectedState);

		action = actions.receivePostedComment(postId, {author, comment});

		const reduceReturn = comments(initialState, action);

		expect(reduceReturn.isFetching)
			.toEqual(expectedState.isFetching);

		expect(reduceReturn.items)
			.toEqual(expectedState.items);

		expect(reduceReturn.lastUpdated)
			.toBeGreaterThanOrEqualTo(expectedState.lastUpdated);

	});

	it('Should delete a comment and return a new state', () => {
		expectedState = {
			isFetching: false,
			items: []
		}

		action = actions.deleteComment(postId,0);

		expect(comments(initialState, action))
			.toEqual(expectedState);
	});

});
