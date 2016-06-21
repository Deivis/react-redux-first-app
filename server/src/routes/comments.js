'use strict'
const comments  = require('../data/comments');
const router = require('express').Router();

router.get('', function (req, res) {
  res.send(comments);
});

module.exports = router;