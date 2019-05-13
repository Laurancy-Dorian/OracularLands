/**
 * Requires libraries
 */
var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* Creates pool and stores it in global so that all methods can access it */
global.pool = require('./db/initDB');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/**
 * Homepage
 */
app.get('/', function(req, res, next) {
    res.send('Homepage');
});


/**
 * Static files
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Loads the routes for all ressources
 */
var routes = require('./routes');
app.use('/', routes);


/**
 * The 404 Route
 */
app.use('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = app;
