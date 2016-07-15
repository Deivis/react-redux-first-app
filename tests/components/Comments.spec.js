import expect  from 'expect';

import jsdomify from 'jsdomify';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import Comments from '../../public/components/Comments';

import comments from '../../public/data/comments';

/*
	This is my first component test specs, so, i will use diferent approaches to testing the Comments component
	and learnd about tests in react components in redux architecture
*/

const setup = () => {
	const postId = 'BAhvZrRwcfu';
  const props = {
    addComment: expect.createSpy(),
    comments: comments[postId],
 		isFetching: false,
    postId: postId,
  	removeComment: expect.createSpy()
  };

  /*
  	this objects are user to 'shallow render' the components
  	the components aren't created in the DOM,
  	are used mainly to test the components strcture
  */
  let renderer = TestUtils.createRenderer();
  renderer.render(<Comments {...props}  />);
  let output = renderer.getRenderOutput();

  // create a DOM tree for tests
  jsdomify.create();

  /*
   	this objects are used for tests over the DOM
		the components are created and attached to the DOM
		are used mainly to test the components behaviour
  */
  let component = TestUtils.renderIntoDocument(<Comments {...props}  />);
  let renderedDOM = () => React.findDOMNode(this.component);

  return {
    props,
    output,
    renderer,
    component,
    renderedDOM
  }
}

describe('Comments component: ', () => {
	const { output, props, renderer, component, renderedDOM } = setup();
	const [ divs, form ] = output.props.children;

  it('Should render a div element with the class "comments" ', () => {

  	//Comments component asserts
    expect(output.type).toBe('div');
    expect(output.props.className).toBe('comments');
  })

	it('Should render an array of divs and a form as children', () => {
    let [div] = divs;

    // div asserts
    expect(div.type).toBe('div');
		expect(div.props.className).toBe('comment');

		// form asserts
    expect(form.type).toBe('form');
    expect(form.props.className).toBe('comment-form');
  })

	it('Should the form render onde span(overlay) and tree inputs: author, comment and submit', () => {
    	let [overlay, author, comment, submit] = form.props.children;

			// span overlay asserts
			expect(overlay.type).toBe('span');

    	// imput author asserts
			expect(author.type).toBe('input');
			expect(author.ref).toBe('author');
			expect(author.props.placeholder).toBe('author');

			// imput author asserts
			expect(comment.type).toBe('input');
			expect(comment.ref).toBe('comment');
			expect(comment.props.placeholder).toBe('comment');

			// imput author asserts
			expect(submit.type).toBe('input');
			expect(submit.props.type).toBe('submit');
			expect(submit.ref).toNotExist();
			expect(submit.props.placeholder).toNotExist();
			expect(submit.props.hidden).toBe(true);
  })

  it('Should trigger addComment when the form is submmited', () => {
  	let formElement = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
  	let author= formElement.children[0];
  	let comment= formElement.children[1];

  	// setting values in author and comments
  	author.value = 'xuxu';
  	comment.value = 'batata';

  	// asserting addComments isn't called before the submit
  	expect(props.addComment.calls.length).toBe(0);

  	// submitting the form
  	TestUtils.Simulate.submit(formElement);

		//asserting addComment was called
  	expect(props.addComment.calls.length).toBe(1);
  })

  it('Should trigger removeComment when one button with the class "remove-comment" is clicked', () => {
  	let button =  TestUtils.findRenderedDOMComponentWithClass(component, 'remove-comment');

  	// asserting removeComment isn't called before the click
		expect(props.removeComment.calls.length).toBe(0);

		// triggering the button's click event
		TestUtils.Simulate.click(button);

		//asserting removeComment was called
		expect(props.removeComment.calls.length).toBe(1);
  })


})
