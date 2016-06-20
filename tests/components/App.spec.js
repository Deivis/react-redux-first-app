import expect  from 'expect';

import jsdomify from 'jsdomify';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import { createStore } from 'redux';

import { Provider } from 'react-redux';
 
import rootReducer from '../../public/reducers/index';

import App from '../../public/components/App';

import Main from '../../public/components/Main';

import comments from '../../public/data/comments';

import posts from '../../public/data/posts';

const setup = () => {	
	const defaultState = {
		posts,
		comments
	};
	const store = createStore(rootReducer, defaultState);
	const props = store;

	let renderer = TestUtils.createRenderer();
	renderer.render(<Provider store={store}>
									  <App />
									</Provider>);
  let component = renderer.getRenderOutput();

	return {
		props,
		renderer,
		component
	}
}

describe('App connector component: ', () => {
	const { props, component, renderer} = setup();

	it('Should render correctly an App component', () => {

		expect(component).toExist();		
		expect(component.type.displayName).toEqual('Connect(Main)');		
	})

	it('Should wrap a Main component', () => {
		let MainComponent =  component.type.WrappedComponent;
		
		expect(MainComponent).toEqual(Main);
	})

})	
