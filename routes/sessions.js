var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /sessions`);
    });

router.route('/:idSession')
    .get(function (req, res, next) {
        res.send(`GET /sessions/${req.param.idSession}`);
    })
    .patch(function (req, res, next) {
        res.send(`PATCH /sessions/${req.param.idSession}`);
    })
    .delete(function (req, res, next) {
        res.send(`DELETE /sessions/${req.param.idSession}`);
    });

/**
 *  Sub ressources
 */



module.exports = router;
