var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /story-arcs/${req.idStoryArc}/scenarios`);
    })
    .post(function (req, res, next) {
        res.send(`POST /story-arcs/${req.idStoryArc}/scenarios`);
    });

router.route('/:idScenario')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idScenario)) {
            res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.params.idScenario}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .patch(function (req, res, next) {
        if (!isNaN(req.params.idScenario)) {
            res.send(`PATCH /story-arcs/${req.idStoryArc}/scenarios/${req.params.idScenario}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idScenario)) {
            res.send(`DELETE /story-arcs/${req.idStoryArc}/scenarios/${req.params.idScenario}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

/**
 *  Sub ressources
 */
router.use('/:idScenario/situations', (req, res, next) => {
    req.idScenario = req.params.idScenario;
    next();
}, require('./situations'));


module.exports = router;
