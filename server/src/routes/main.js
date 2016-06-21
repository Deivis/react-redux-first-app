'use strict'
const router = require('express').Router();
const rootDir = process.cwd();
const path = require('path');

router.get('*', function (req, res) {
  res.sendFile(path.join(rootDir, 'index.html'));
});

module.exports = router;