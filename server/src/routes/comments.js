'use strict'
const comments  = require('../data/comments');
const router = require('express').Router();

router.get('', function (req, res) {
  res.send(comments);
});

router.get('/:postId', function (req, res) {
	const postId = req.params.postId;
	let postComments = comments[postId];
	postComments = postComments || [];
  res.send(postComments);
});

// just a mock post to test the async actions on the client
router.post('/:postId', function (req, res) {
	let newComment = JSON.parse(req.body);
	//TODO: create a database or use the filesystem to save this new comment in the post which the id received
	
	//Just a time mock to force the app to wait for the response
	setTimeout(()=>{
		res.send(newComment);
	}, 1000);
});

// just a mock post to test the async actions on the client
router.delete('/:postId/:commentIndex', function (req, res) {
	let index = req.params.commentIndex;

	//TODO: create a database or use the filesystem to remove this comment

	//Just a time mock to force the app to wait for the response
	setTimeout(()=>{
		res.send(index);
	}, 1000);
});


module.exports = router;
