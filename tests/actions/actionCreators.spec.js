import * as actions from '../../public/actions/actionCreators';

import * as types from '../../public/actions/actionTypes';

import expect from 'expect';

describe('actions: ', ()=>{

	it('Should create an action to add a comment', () => {
		const comment ="asd";
		const author = "xuxu";
		const postId = "1161022966406956503";
		const expectedAction = {
			type: types.ADD_COMMENT,
			postId, 
			author, 
			comment
		};
		const newAction = actions.addComment(postId, author, comment);

		expect(newAction).toEqual(expectedAction);
	});

	it('Should create an action to remove a comment', () => {
		const postId = "1161022966406956503";
		const index = 0;
		const expectedAction = {	
			type: types.REMOVE_COMMENT,
			postId, 
			index
		};
		const newAction = actions.removeComment(postId,index);

		expect(newAction).toEqual(expectedAction);
	});

	it('Should create an action to increment the likes', () => {
		const index = 0;
		const expectedAction = {	
			type: types.INCREMENT_LIKES,
			index
		};
		const newAction = actions.increment(index);

		expect(newAction).toEqual(expectedAction);
	});
});