var path = require('path');
var express = require('express');
var app = express();

var api = require('./api/');
var auth = require('./auth/routes');
var err = require('./middleware/err');
var mongoose = require('mongoose').set('debug', true);
var config = require('./config/config');

mongoose.connect(config.db.url);

if (config.seed) {
  require('./util/seed');
}

require('./middleware/appMiddleware')(app);
require('./routes.js')(app);

// app.use('/api', api);

// households
app.get('/households', function(req, res) {
  res.send('get all households')
})

app.post('/households', function(res, res) {
  res.send('post to households')
})

app.get('/households/:id', function(rew, res) {
  res.send('get one household')
})






app.use('/auth', auth);

app.use(err);

module.exports = app;
