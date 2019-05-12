var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send('GET /users/new');
    })
    .post(function (req, res, next) {
        res.send('POST /users/new');
    });

router.route('/:idUser')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idUser)) {
            res.send(`GET /users/new/${req.params.idUser}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .post(function (req, res, next) {
        if (!isNaN(req.params.idUser)) {
            res.send(`POST /users/new/${req.params.idUser}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

module.exports = router;
