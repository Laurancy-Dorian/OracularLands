var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /story-arcs/${req.idStoryArc}/files`);
    })


/**
 *  Sub ressources
 */



module.exports = router;
