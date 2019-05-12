var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send('GET /story-arcs');
    })
    .post(function (req, res, next) {
        res.send('POST /story-arcs');
    });

router.route('/:idStoryArc')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idStoryArc)) {
            res.send(`GET /story-arcs/${req.params.idStoryArc}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .patch(function (req, res, next) {
        if (!isNaN(req.params.idStoryArc)) {
            res.send(`PATCH /story-arcs/${req.params.idStoryArc}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idStoryArc)) {
            res.send(`DELETE /story-arcs/${req.params.idStoryArc}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

/**
 *  Sub ressources
 */
const addIdStoryArcToRouter = (req, res, next) => {
    req.idStoryArc = req.params.idStoryArc;
    next();
};

router.use('/:idStoryArc/scenarios', addIdStoryArcToRouter, require('./scenarios'));

router.use('/:idStoryArc/sessions', addIdStoryArcToRouter, require('./sessions'));

module.exports = router;
