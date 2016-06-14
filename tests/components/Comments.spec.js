import expect  from 'expect';

import React from 'react';

import TestUtils from 'react-addons-test-utils'

import Comments from '../../public/components/Comments'

import comments from '../../public/data/comments';

function setup() {
  const props = { 
  	params: {
  		postId:'BAhvZrRwcfu'
  	},
  	comments: [],
  	addComment: expect.createSpy(),
  	removeComment: expect.createSpy()
  };

  props.comments = comments[props.params.postId];

  let renderer = TestUtils.createRenderer();
  renderer.render(<Comments {...props}  />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('Comments component: ', () => {
	const { output } = setup();
	
  it('Should render correctly', () => {

    expect(output.type).toBe('div');
  })

  it('Should have the class "comments"', () => {
  	
    expect(output.props.className).toBe('comments');
  })  

})
