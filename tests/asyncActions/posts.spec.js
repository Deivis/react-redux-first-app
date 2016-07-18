import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import nock from 'nock';

import expect from 'expect';

import fetch from 'node-fetch';

import * as actions from '../../public/actions/actionCreators';

import * as types from '../../public/actions/actionTypes';

const middlewares = [ thunk ];

const setup = () => {

  const defaultState = {
    posts: {
      isIncrementingLikes: false,
      isFetching: false,
      items:[]
    },
    comments:{
      isFetching: false,
      items: [{
        "text":"Wes. WE should have lunch.",
        "user": "jdaveknox"
      },
      {
        "text":"#adults",
        "user": "jdaveknox"
      }]
    }
  };

  const mockStore = configureMockStore(middlewares);

  const origin = 'http://localhost:7770';

  const postId = 'BAcyDyQwcXX';

  window.fetch = fetch;

  return {
    mockStore,
    origin,
    defaultState,
    postId
  };
};

describe('Posts async actions: ', () => {

  afterEach(() => {

    nock.cleanAll();
  });

  it('creates RECEIVE_POSTS when get posts has been done', ()=>{
    const {mockStore, origin, defaultState, postId} = setup();

    const now = Date.now();

    nock(origin)
      .get('/posts/')
      .reply(200, []);

    const expectedActions = {
      requestPosts: {
        type: types.REQUEST_POSTS,
        isFetching: true
      },
      receivePosts: {
        type: types.RECEIVE_POSTS,
        isFetching: false,
        items: [],
        lastUpdated: now
      }
    };

    const store = mockStore(defaultState);
    
  });
});
