var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /users/${req.idUser}/sessions`);
    });


/**
 *  Sub ressources
 */



module.exports = router;
