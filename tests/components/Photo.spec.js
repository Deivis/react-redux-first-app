import expect  from 'expect';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import Photo from '../../public/components/Photo';

import comments from '../../public/data/comments';

const setup = () => {
	let post = {
      "code":"BAcyDyQwcXX",
      "caption":"Lunch #hamont",
      "likes":56,
      "id":"1161022966406956503",
      "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
  };
  const props ={
   	index: 0,
   	post: post,
   	comments: comments[post.code],
   	increment: expect.createSpy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Photo {...props}  />);
  let component = renderer.getRenderOutput();

  return {
    props,
    component,
    renderer
  }
}

describe('Photo component:', () => {
	const { props, component, renderer } = setup();

	it('Should the component render a figure element with the class "grid-figure"',() =>{

    expect(component.type).toBe('figure');
    expect(component.props.className).toBe('grid-figure');
	})

	it('Should the component render two chilren, onde div with the class "grid-photo-wrap" and a figcaption element',() =>{
		let [div,fig] = component.props.children;

    expect(div.type).toBe('div');
    expect(div.props.className).toBe('grid-photo-wrap');

    expect(fig.type).toBe('figcaption');
	})

	describe('Child div: ', () =>{
		let [div,fig] = component.props.children;
		let [Link, ReactCSSTransitionGroup] = div.props.children;

		it('Should the child div have two children, one Link component and a ReactCSSTransitionGroup component', () => {

			expect(Link.type.displayName).toBe('Link');
			expect(Link.props.to).toBe(`/view/${props.post.code}`);

			expect(ReactCSSTransitionGroup.type.displayName).toBe('ReactCSSTransitionGroup');
			expect(ReactCSSTransitionGroup.props.transitionName).toBe('like');
			expect(ReactCSSTransitionGroup.props.transitionEnterTimeout).toBeLessThanOrEqualTo(300);
			expect(ReactCSSTransitionGroup.props.transitionLeaveTimeout).toBeLessThanOrEqualTo(300);
		})

		describe('Child Link: ', () => {
			let img = Link.props.children;

			it('Should the child Link have one child img with class "grid-photo"', () => {

				expect(img.type).toBe('img');
				expect(img.props.className).toBe('grid-photo');
				expect(img.props.src).toBe(props.post.display_src);
				expect(img.props.alt).toBe(props.post.caption);
			})
		})

		describe('Child CSSTransitionGroup: ', () => {
			let span = ReactCSSTransitionGroup.props.children;

			it('Should the child Link have one child img with class "grid-photo"', () => {

				expect(span.type).toBe('span');
				expect(span.props.className).toBe('likes-heart');
				expect(span.key).toEqual(props.post.likes);
				expect(span.props.children).toEqual(props.post.likes);
			})
		})

	})

	describe('Child figcaption: ', () =>{
		let [div,fig] = component.props.children;
		let [p,divChild] = fig.props.children;

		it('Should the figcaption have two children, one paragraph and a div', () => {

			expect(p.type).toBe('p');
			expect(divChild.type).toBe('div');
		})

		it('Should the paragraph text be equal to the post caption', () => {

				expect(p.props.children).toEqual(props.post.caption);
		})

		describe('Child div: ',()=>{
			let [button, Link] = divChild.props.children;

			it('Should the have two children, one button and a Link component', () => {

				expect(button.type).toBe('button');

				expect(Link.type.displayName).toBe('Link');
				expect(Link.props.to).toBe(`/view/${props.post.code}`);
				expect(Link.props.className).toBe('button');
			})

			describe('Child button: ', ()=>{

				it('Should have the class "likes" and the text with the tag "&hearts;" and the likes number',() => {

					expect(button.props.className).toBe('likes');
					expect(button.props.children[1]).toEqual(props.post.likes);
				})

				it('Should trigger the increment function when is clicked',() => {

					expect(props.increment.calls.length).toBe(0);

					button.props.onClick(0);

					expect(props.increment.calls.length).toBe(1);
				})

			})

			describe('Child Link: ', () => {
				let span = Link.props.children;

				it('Shoul have a span child with the class "comment-count"', ()=> {

						expect(span.type).toBe('span');
						expect(span.props.className).toBe('comment-count');
				})

				describe('Child span: ', () => {
				it('Shoul have a span child with the class "speech-bubble" and the sum of comments of the related post', ()=> {
					let [spanChild, text] = span.props.children;
					let len = props.comments ? props.comments.length: 0;

					expect(spanChild.type).toBe('span');
					expect(spanChild.props.className).toBe('speech-bubble');
					expect(text).toEqual(len);
				})
			})

			})

		})

	})

})
