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

const addIdUserToRouter = (req, res, next) => {
    req.idUser = req.params.idUser;
    next();
};

router.use('/:idUser/story-arcs', addIdUserToRouter, require('./story-arcs'));
router.use('/:idUser/sessions', addIdUserToRouter, require('./sessions'));
router.use('/:idUser/sessions-playing', addIdUserToRouter, require('./sessions-playing'));


module.exports = router;
