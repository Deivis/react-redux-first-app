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
      items:[{
         "code":"BAcyDyQwcXX",
         "caption":"Lunch #hamont",
         "likes":56,
         "id":"1161022966406956503",
         "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
      }]
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

describe('Comments async actions: ', () => {

  afterEach(() => {

    nock.cleanAll();
  });

  it('creates RECEIVE_POSTED_COMMENT when post comment has been done', ()=>{
    const {mockStore, origin, defaultState, postId} = setup();

    const now = Date.now();

    nock(origin)
      .post('/comments/'+postId)
      .reply(200, {
        author: "XUXU",
        comment: "BATATA"
      });

    const expectedActions = {
      postComment: { type: types.POST_COMMENT },
      receivePost: {
        type: types.RECEIVE_POSTED_COMMENT,
        postId: postId,
        author: "XUXU",
        comment: "BATATA",
        receivedAt: now
      }
    };

    const store = mockStore(defaultState);

    return store.dispatch(actions.addCommentIfCan(postId,'XUXU','BATATA', origin))
                .then(() => { // return of async actions
                  const [postComment, receivePost] = store.getActions();

                  expect(postComment)
                    .toEqual(expectedActions.postComment,
                              "Expect received POST_COMMENT to be equal to the expected");

                  expect(receivePost.type)
                    .toEqual(expectedActions.receivePost.type,
                              "Expect received Type to be equal to the expected");

                  expect(receivePost.postId)
                    .toEqual(expectedActions.receivePost.postId,
                              "Expect received PostId to be equal to the expected");

                  expect(receivePost.author)
                    .toEqual(expectedActions.receivePost.author,
                              "Expect received Author to be equal to the expected");

                  expect(receivePost.comment)
                    .toEqual(expectedActions.receivePost.comment,
                              "Expect received Comment to be equal to the expected");

                  expect(receivePost.receivedAt)
                    .toBeGreaterThanOrEqualTo(expectedActions.receivePost.receivedAt,
                                                "Expect received time to be equal or greater than the expected");
                });
  });

  it('creates RECEIVE_REMOVED_COMMENT when delete comment has been done', ()=>{
    const {mockStore, origin, defaultState, postId} = setup();

    const now = Date.now();

    const index = 0;

    nock(origin)
      .delete(`/comments/${postId}/0`)
      .reply(200, { index });

    const store = mockStore(defaultState);

    const expectedActions = {
      deleteComment: {
      	type: types.REMOVE_COMMENT,
      	postId,
      	index
      },
      receiveRemovedCommentIndex: {
      	type: types.RECEIVE_REMOVED_COMMENT,
      	postId,
      	index: { index },
      	confirmedAt: now
      }
    };

    return store.dispatch(actions.removeComment(postId, index, origin))
                .then(() =>{
                  const [deleteComment, receiveRemovedCommentIndex] = store.getActions();

                  expect(deleteComment)
                    .toEqual(expectedActions.deleteComment);

                  expect(receiveRemovedCommentIndex.type)
                    .toEqual(expectedActions.receiveRemovedCommentIndex.type);

                  expect(receiveRemovedCommentIndex.postId)
                    .toEqual(expectedActions.receiveRemovedCommentIndex.postId);

                  expect(receiveRemovedCommentIndex.index)
                    .toEqual(expectedActions.receiveRemovedCommentIndex.index);

                  expect(receiveRemovedCommentIndex.confirmedAt)
                    .toBeGreaterThanOrEqualTo(expectedActions.receiveRemovedCommentIndex.confirmedAt,
                                              "Expect received time to be equal or greater than the expected");
                });
  });

  it('creates RECEIVE_COMMENTS when get comments has been done', ()=>{
    const {mockStore, origin, defaultState, postId} = setup();

    nock(origin)
      .get(`/comments/${postId}`)
      .reply(200, []);

    const store = mockStore(defaultState);

    const now = Date.now();

    const expectedActions = {
      requestComments: {
        type: types.REQUEST_COMMENTS,
      	postId
      },
      receiveComments: {
        type: types.RECEIVE_COMMENTS,
        postId,
        comments: [],
        receivedAt: now
      }
    };

    return store.dispatch(actions.fetchCommentsIfNeeded(postId, origin))
                .then(() =>{
                  const [requestComments, receiveComments] = store.getActions();

                  expect(requestComments)
                    .toEqual(expectedActions.requestComments);

                  expect(receiveComments.type)
                    .toEqual(expectedActions.receiveComments.type);

                  expect(receiveComments.comments)
                    .toEqual(expectedActions.receiveComments.comments);

                  expect(receiveComments.postId)
                    .toEqual(expectedActions.receiveComments.postId);

                  expect(receiveComments.receivedAt)
                    .toBeGreaterThanOrEqualTo(expectedActions.receiveComments.receivedAt,
                                              "Expect received time to be equal or greater than the expected");
                });
  });
});
