var express = require('express');
var router = express.Router();

const storyArcActions = require(appRoot + '/actions/story-arcs');
const auth = require(appRoot + '/actions/auth');
const fileSaving = require(appRoot + '/helpers/file-saving');


const addIdStoryArcToRouter = (req, res, next) => {
    req.idStoryArc = req.params.idStoryArc;
    next();
};

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(storyArcActions.listStoryArcs)
    .post(auth.validateToken, fileSaving.setMulter().any(), storyArcActions.addStoryArc);

router.route('/:idStoryArc')
    .get(addIdStoryArcToRouter, storyArcActions.getStoryArc)
    .patch(addIdStoryArcToRouter, auth.validateToken, storyArcActions.checkRights,
        fileSaving.setMulter().any(), storyArcActions.updateStoryArc)
    .delete(addIdStoryArcToRouter, auth.validateToken, storyArcActions.checkRights,
        storyArcActions.deleteStoryArc);


/**
 *  Sub ressources
 */
router.use('/:idStoryArc/scenarios', addIdStoryArcToRouter, require('./scenarios'));
router.use('/:idStoryArc/sessions', addIdStoryArcToRouter, require('./sessions'));
router.use('/:idStoryArc/folders', addIdStoryArcToRouter, require('./folders'));
router.use('/:idStoryArc/files', addIdStoryArcToRouter, require('./files'));

module.exports = router;
