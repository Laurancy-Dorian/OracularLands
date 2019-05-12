var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send('GET /users/auth');
    })
    .post(function (req, res, next) {
        res.send('POST /users/auth');
    })
    .delete(function (req, res, next) {
        res.send('DELETE /users/auth');
    });

module.exports = router;
