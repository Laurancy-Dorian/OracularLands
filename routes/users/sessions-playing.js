var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /users/${req.idUser}/sessions-playing`);
    });

router.route('/:idSession')
    .get(function (req, res, next) {
        res.send(`GET /users/${req.idUser}/sessions-playing/${req.params.idSession}`);
    })
    .put(function (req, res, next) {
        res.send(`PATCH /users/${req.idUser}/sessions-playing/${req.params.idSession}`);
    })
    .delete(function (req, res, next) {
        res.send(`DELETE /users/${req.idUser}/sessions-playing/${req.params.idSession}`);
    });

/**
 *  Sub ressources
 */



module.exports = router;
