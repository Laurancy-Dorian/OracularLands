var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /users/${req.idUser}/story-arcs`);
    })
    .post(function (req, res, next) {
        res.send(`POST /users/${req.idUser}/story-arcs`);
    });



module.exports = router;
