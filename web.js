var express       = require('express');
var logger        = require('morgan');
var errorhandler  = require('errorhandler');
var orchestrate   = require('orchestrate');
var bodyParser    = require('body-parser');
var apiRouter     = require('./src/backend');

var app = express();

app.use(logger());
app.use(errorhandler());
app.use(bodyParser());

app.use(express.static(__dirname + '/www'));
app.use('/api', apiRouter);

var port = process.env.PORT || 8765;

app.listen(port);
console.log('Listen on ' + port);

module.exports = app;