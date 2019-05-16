var express = require('express');
var router = express.Router();

const storyArcActions = require (appRoot + '/actions/story-arcs');
const auth = require (appRoot + '/actions/auth');

const fileSaving = require(appRoot + '/helpers/file-saving');


/**
 *  Routes of this ressource
 */
router.route('/')
    .get(storyArcActions.listStoryArcs)
    .post(auth.validateToken, fileSaving.setMulter(), storyArcActions.addStoryArc);

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
router.use('/:idStoryArc/folders', addIdStoryArcToRouter, require('./folders'));
router.use('/:idStoryArc/files', addIdStoryArcToRouter, require('./files'));

module.exports = router;
