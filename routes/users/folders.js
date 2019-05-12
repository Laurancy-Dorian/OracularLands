var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`POST /users/${req.idUser}/folders`);
    })
    .post(function (req, res, next) {
        res.send(`POST /users/${req.idUser}/folders`);
    });


/**
 *  Sub ressources
 */



module.exports = router;
