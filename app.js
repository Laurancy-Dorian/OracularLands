/**
 * Requires libraries
 */
var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

/* Creates pool and stores it in global so that all methods can access it */
global.pool = require('./db/initDB');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


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
