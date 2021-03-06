/**
 * Requires libraries
 */

/* load path library */
var path = require('path');

/* Express and its middlewares */
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


/**
 * Saving in global
 */
/* Saves the root of the app in global */
global.appRoot = path.resolve(__dirname);

/* Saves config in global */
global.config = require('./config/config');

/* Creates pool and stores it in global so that all methods can access it */
global.pool = require('./db/initDB');

/**
 * Start express and the middlewares
 */
var app = express();

/* Allow Cors */
/* DEV ONLY */
const cors = require('cors')
app.use(cors())


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


/* Static files */
app.use(express.static(path.join(__dirname, 'public')));    // Sources for the frontend
app.use(express.static(path.join(__dirname, 'userspublic')));   // Files from users that can be accessed by anyone


/**
 * If the request has the custom header 'oracular-lands-data', then we continue the routes
 * If this header is not here, this means the user doesn't have the frontend of the app, then we send it
 * The frontend will then make all its requests with this header
 */
app.use((req, res, next) => {
    if (req.headers['oracular-lands-data']) {
        next('route');
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

/* Defines global response headers */
app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin');
    //console.log(req.headers)
    next();
})


/*  Loads the routes for all resources */
var routes = require('./routes');
app.use('/', routes);


/* The 404 Route */
app.use('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = app;