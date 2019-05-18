var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /sessions/${req.idSession}/files-displayed`);
    });

router.route('/:idFile')
    .get(function (req, res, next) {
        res.send(`GET /sessions/${req.idSession}/files-displayed/${req.params.idFile}`);
    })
    .put(function (req, res, next) {
        res.send(`PUT /sessions/${req.idSession}/files-displayed/${req.params.idFile}`);
    })
    .delete(function (req, res, next) {
        res.send(`DELETE /sessions/${req.idSession}/files-displayed/${req.params.idFile}`);
    });

/**
 *  Sub ressources
 */



module.exports = router;
