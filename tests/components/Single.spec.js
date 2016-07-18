import expect  from 'expect';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import Single from '../../public/components/Single';

import Photo from '../../public/components/Photo';

import Comments from '../../public/components/Comments';

import * as actions from '../../public/actions/actionCreators';

import comments from '../../public/data/comments';

import posts from '../../public/data/posts';

const setup = () => {
	const postId = 'BAhvZrRwcfu';
	const props = {
		posts:{
			isIncrementingLikes: false,
			isFetching: false,
			items: posts
		},
		params:{
  		postId: postId
  	},
		comments:{
			isFetching: false,
			items: comments
		},
		addCommentIfCan: expect.createSpy(),
		increment: expect.createSpy(),
		removeComment: expect.createSpy()
	};
	let renderer = TestUtils.createRenderer();
  renderer.render(<Single {...props}  />);
  let component = renderer.getRenderOutput();

	return {
		props,
		renderer,
		component
	};
};

describe('Single component: ', () => {
	const { props, component, renderer} = setup();
	const [PhotoComponent,CommentsComponent] = component.props.children;

	it('Should render a div with the class "single-photo" correctly', () => {

		expect(component).toExist();

		expect(component.type).toBe('div');

		expect(component.props.className).toBe('single-photo');
	});

	it('Should render a Photo component and a Comments component as children', () => {

		expect(PhotoComponent).toExist();

		expect(PhotoComponent.type).toEqual(Photo);

		expect(CommentsComponent).toExist();

		expect(CommentsComponent.type).toEqual(Comments);
	});

	it('Should trigger the increment function when the Photo increment is trigged', () => {

		expect(props.increment.calls.length).toBe(0);

		PhotoComponent.props.increment(0);

		expect(props.increment.calls.length).toBe(1);
	});

	it('Should trigger addComment and removeComment when the addComment and removeComment of Comments component are trigged', () => {

		expect(props.addCommentIfCan.calls.length).toBe(0);

		CommentsComponent.props.addComment(actions.addCommentIfCan('BAhvZrRwcfu','xuxu', 'xuxu'));

		expect(props.addCommentIfCan.calls.length).toBe(1);

		expect(props.removeComment.calls.length).toBe(0);

		CommentsComponent.props.removeComment(actions.removeComment('BAhvZrRwcfu',0));

		expect(props.removeComment.calls.length).toBe(1);
	});

});
