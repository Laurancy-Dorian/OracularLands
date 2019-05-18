var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /story-arcs/${req.idStoryArc}/sessions`);
    })
    .post(function (req, res, next) {
        res.send(`POST /story-arcs/${req.idStoryArc}/sessions`);
    });

/**
 *  Sub ressources
 */



module.exports = router;
