var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/files`);
    })

router.route('/:idFile')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idFile)) {
            res.send(`GET /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/files/${req.params.idFile}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .put(function (req, res, next) {
        if (!isNaN(req.params.idFile)) {
            res.send(`PUT /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/files/${req.params.idFile}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idFile)) {
            res.send(`DELETE /story-arcs/${req.idStoryArc}/scenarios/${req.idScenario}/situations/${req.idSituation}/files/${req.params.idFile}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });


/**
 *  Sub ressources
 */



module.exports = router;
