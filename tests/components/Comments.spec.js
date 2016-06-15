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
	const { output, props } = setup();
	const [ divs, form ] = output.props.children;
	
  it('Should render a div element with the class "comments" ', () => {

    expect(output.type).toBe('div');
    expect(output.props.className).toBe('comments');    
  })


	it('Should render an array of divs and a form as children', () => {  
    let [div] = divs;

    expect(div.type).toBe('div');
		expect(div.props.className).toBe('comment');

    expect(form.type).toBe('form');
    expect(form.props.className).toBe('comment-form');
  })
	
	it('Should the form render tree inputs: author, comment and submit', () => {
    	let [author,comment,submit] = form.props.children;

			expect(author.type).toBe('input');
			expect(author.ref).toBe('author');
			expect(author.props.placeholder).toBe('author');

			expect(comment.type).toBe('input');
			expect(comment.ref).toBe('comment');
			expect(comment.props.placeholder).toBe('comment');

			expect(submit.type).toBe('input');
			expect(submit.props.type).toBe('submit');
			expect(submit.ref).toNotExist();
			expect(submit.props.placeholder).toNotExist();
			expect(submit.props.hidden).toBe(true);
  })
})
