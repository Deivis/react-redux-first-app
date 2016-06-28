'use strict'
const comments  = require('../data/comments');
const router = require('express').Router();

router.get('', function (req, res) {
  res.send(comments);
});

router.get('/:postId', function (req, res) {
	const postId = req.params.postId;
  res.send(comments[postId]);
});

// just a mock post to test the async actions on the client
router.post('/:postId', function (req, res) {
	let newComment = JSON.parse(req.body);
	//TODO: create a database or use the filesystem to save this new comment in the post which the id received
  res.send(newComment);
});

module.exports = router;