var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /folders/${req.idFolder}/files`);
    })
    .post(function (req, res, next) {
        res.send(`POST /folders/${req.idFolder}/files`);
    });


/**
 *  Sub ressources
 */



module.exports = router;
