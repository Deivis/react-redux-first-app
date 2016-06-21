const express = require('express');
const webpack = require('webpack');
const config = require('../../webpack.config.dev');
const bodyParser = require('body-parser');
const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

const main = require('./routes/main');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

app.use('/posts', posts);
app.use('/comments', comments);
app.use('*', main);

const server = app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});

module.exports = server;