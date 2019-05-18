var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations`);
    })
    .post(function (req, res, next) {
        res.send(`POST /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations`);
    });

router.route('/:idSituation')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idSituation)) {
            res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.params.idSituation}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .patch(function (req, res, next) {
        if (!isNaN(req.params.idSituation)) {
            res.send(`PATCH /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.params.idSituation}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idSituation)) {
            res.send(`DELETE /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.params.idSituation}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

/**
 *  Sub ressources
 */
const addIdSituationToRouter = (req, res, next) => {
    req.idSituation = req.params.idSituation;
    next();
};

router.use('/:idSituation/folders', addIdSituationToRouter, require('./folders'));
router.use('/:idSituation/files', addIdSituationToRouter, require('./files'));

module.exports = router;
