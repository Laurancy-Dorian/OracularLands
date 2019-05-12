/**
 * Requires libraries
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Loads the routes
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
