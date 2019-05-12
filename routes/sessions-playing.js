var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /sessions-playing`);
    });

router.route('/:idSession')
    .get(function (req, res, next) {
        res.send(`GET /sessions-playing/${req.params.idSession}`);
    })
    .put(function (req, res, next) {
        res.send(`PATCH /sessions-playing/${req.params.idSession}`);
    })
    .delete(function (req, res, next) {
        res.send(`DELETE /sessions-playing/${req.params.idSession}`);
    });

/**
 *  Sub ressources
 */



module.exports = router;
