import expect  from 'expect';

import React from 'react';

import TestUtils from 'react-addons-test-utils'

import Comments from '../../public/components/Comments'

import { comments as dataComments } from '../../public/data/comments';

function setup() {
  const props = { 
  	params: {
  		postId:'BAhvZrRwcfu'
  	},
  	coments: dataComments,
  	addComment: expect.createSpy(),
  	removeComment: expect.createSpy()
  };

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
  it('Should render correctly', () => {
    const { output } = setup();

    expect(output.type).toBe('comments');
    expect(output.props.className).toBe('comments');
    /*
    let [ h1, input ] = output.props.children

    expect(h1.type).toBe('h1')
    expect(h1.props.children).toBe('todos')

    expect(input.type).toBe(TodoTextInput)
    expect(input.props.newTodo).toBe(true)
    expect(input.props.placeholder).toBe('What needs to be done?')
  })

  it('Should call addTodo if length of text is greater than 0', () => {
    const { output, props } = setup()
    let input = output.props.children[1]
    input.props.onSave('')
    expect(props.addTodo.calls.length).toBe(0)
    input.props.onSave('Use Redux')
    expect(props.addTodo.calls.length).toBe(1)
    */
  })
})
