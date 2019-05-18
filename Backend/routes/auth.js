var express = require('express');
var router = express.Router();
var authActions = require (appRoot + '/actions/auth');

/**
 *  Routes of this ressource
 */
router.route('/')
    .post(authActions.login)
    .delete(function (req, res, next) {
        res.send('DELETE /auth');
    });

module.exports = router;
