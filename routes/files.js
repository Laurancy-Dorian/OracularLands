var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/:idFile')
    .get(function (req, res, next) {
        res.send(`GET /files/${req.params.idFile}`);
    })
    .put(function (req, res, next) {
        res.send(`POST /files/${req.params.idFile}`);
    })
    .patch(function (req, res, next) {
        res.send(`PATCH /files/${req.params.idFile}`);
    })
    .delete(function (req, res, next) {
        res.send(`DELETE /files/${req.params.idFile}`);
    });

module.exports = router;
