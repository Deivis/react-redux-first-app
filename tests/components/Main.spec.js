import expect  from 'expect';

import jsdomify from 'jsdomify';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import Main from '../../public/components/Main';

import PhotoGrid from '../../public/components/PhotoGrid';

import comments from '../../public/data/comments';

import posts from '../../public/data/posts';

const setup = () => {
	const props = {
		children: <PhotoGrid />,
		posts:{
			isIncrementingLikes: false,
			isFetching: false,
			items: posts
		},
   	comments:{
			isFetching: false,
			items: comments
		}, 
		fetchPostsIfNeeded: expect.createSpy(),
   	addComment: expect.createSpy(),
   	increment: expect.createSpy(),
   	removeComment: expect.createSpy()
	};

	let renderer = TestUtils.createRenderer();
  renderer.render(<Main {...props}  />);
  let component = renderer.getRenderOutput();

	return {
		props,
		renderer,
		component
	}
}

describe('Main component: ', () => {
	const { props, component, renderer} = setup();

	it('Should render correctly and render a div element with a H1 element and a PhotoGrid component as children', () => {
		let [h1,PhotoGridComponent] = component.props.children;

		expect(component).toExist();

		expect(h1.type).toBe('h1');

		expect(PhotoGridComponent.type).toEqual(PhotoGrid);
	})

})	