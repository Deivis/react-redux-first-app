import * as actions from '../../public/actions/actionCreators';

import * as types from '../../public/actions/actionTypes';

import expect from 'expect';

describe('Actions: ', ()=>{

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
