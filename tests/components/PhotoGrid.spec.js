import expect  from 'expect';

import jsdomify from 'jsdomify';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import PhotoGrid from '../../public/components/PhotoGrid';

import Photo from '../../public/components/Photo';

import comments from '../../public/data/comments';

import posts from '../../public/data/posts';

const setup = () => {
  const props ={
   	posts: {
   		isIncrementingLikes: false,
			isFetching: false,
   		items:posts
   	}, 
   	comments: {
			isFetching: false,
   		items:comments
   	}, 
   	increment: expect.createSpy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<PhotoGrid {...props}  />);
  let component = renderer.getRenderOutput();

	return {
    props,
    component,
    renderer
  }
}

describe('PhotoGrid component: ', () => {
	const { props, component, renderer} = setup();

	it('Should render a div with the class "photo-grid" correctly', () => {

		expect(component).toExist();
		expect(component.type).toBe('div');
		expect(component.props.className).toBe('photo-grid');
	})

	it('Should render a list of Photo components', () => {
		let children = component.props.children;
		let firstChild = children[0];
		
		expect(firstChild).toExist();
		expect(firstChild.type).toEqual(Photo);
	})

})