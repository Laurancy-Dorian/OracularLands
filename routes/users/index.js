var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send('GET /users');
    })
    .post(function (req, res, next) {
        res.send('POST /users');
    });

router.route('/:idUser')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idUser)) {
            res.send(`GET user ${req.params.idUser}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .patch(function (req, res, next) {
        if (!isNaN(req.params.idUser)) {
            res.send(`PATCH user ${req.params.idUser}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idUser)) {
            res.send(`DELETE user ${req.params.idUser}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

/**
 *  Sub ressources
 */
router.use('/:idUser/story-arcs', (req, res, next) => {
    req.idUser = req.params.idUser;
    next();
}, require('./story-arcs'));


module.exports = router;
