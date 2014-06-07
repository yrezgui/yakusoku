var express       = require('express');
var logger        = require('morgan');
var errorhandler  = require('errorhandler');
var orchestrate   = require('orchestrate');
var bodyParser    = require('body-parser');

var app = express();

app.use(logger());
app.use(errorhandler());
app.use(bodyParser());

app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 8765;

app.listen(port);
console.log('Listen on ' + port);

module.exports = app;