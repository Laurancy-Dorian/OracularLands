var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .post(function (req, res, next) {
        res.send('POST /auth');
    })
    .delete(function (req, res, next) {
        res.send('DELETE /auth');
    });

module.exports = router;
