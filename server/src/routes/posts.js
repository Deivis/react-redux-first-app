'use strict';
const posts  = require('../data/posts');
const router = require('express').Router();

router.get('', function (req, res) {
  res.send(posts);
});

module.exports = router;
