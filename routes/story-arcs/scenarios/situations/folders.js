var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/folders`);
    })

router.route('/:idFolder')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idFolder)) {
            res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/folders/${req.params.idFolder}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .put(function (req, res, next) {
        if (!isNaN(req.params.idFolder)) {
            res.send(`PUT /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/folders/${req.params.idFolder}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idFolder)) {
            res.send(`DELETE /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/folders/${req.params.idFolder}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });


/**
 *  Sub ressources
 */



module.exports = router;
