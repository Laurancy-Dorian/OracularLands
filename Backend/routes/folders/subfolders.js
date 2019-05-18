var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /folders/${req.idFolder}/subfolders`);
    })
    .post(function (req, res, next) {
        res.send(`POST /folders/${req.idFolder}/subfolders`);
    });


/**
 *  Sub ressources
 */



module.exports = router;
