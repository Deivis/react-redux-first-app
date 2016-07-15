import posts from '../../public/reducers/posts';

import * as actions from '../../public/actions/actionCreators';

import expect  from 'expect';

describe('posts reducer: ', () => {
	const initialState = {
		isFetching: false,
		isIncrementingLikes: false,
		items: [{
      "code":"BAcyDyQwcXX",
      "caption":"Lunch #hamont",
      "likes":56,
      "id":"1161022966406956503",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
    }]
	};
  const expectedState ={
		isFetching: false,
		isIncrementingLikes: false,
		items:[{
      "code":"BAcyDyQwcXX",
      "caption":"Lunch #hamont",
      "likes":57,
      "id":"1161022966406956503",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
    }]
	};
	const action = actions.increment(0);

  it('Should return a new state which isnt empty', () => {

  	expect(posts(initialState, action))
    	.toExist();
  });

  it('Should return a new state diferent of the initial state', () => {

    expect(posts(initialState, action))
    	.toNotEqual(initialState);
  });

  it('Should return the new state with the first post likes changed', () => {

    expect(posts(initialState, action))
    	.toEqual(expectedState);
  });

})
