import React from 'react';

import {render} from 'react-dom';

//Import css, this will be imported by the webpack and injected on the app
import css from './styles/style.styl';


//Components, this will be imported the components created in the tutorial
import Main from './components/Main';

import Single from './components/Single';

import PhotoGrid from './components/PhotoGrid';

//Import react-router things
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import { Provider } from 'react-redux';

//Our store + history
import store, {history} from './store';


const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Main}>
				<IndexRoute component={PhotoGrid}></IndexRoute>
				<Route path="/view/:postId" component={Single}></Route>
			</Route>
		</Router>
	</Provider>
);

const root = document.getElementById('root');

render(router, root);