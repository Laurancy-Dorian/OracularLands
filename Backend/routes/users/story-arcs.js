var express = require('express');
var router = express.Router();
const storyArcActions = require(appRoot + '/actions/story-arcs');

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(storyArcActions.listStoryArcsByUser)
    .post(function (req, res, next) {
        res.send(`POST /users/${req.idUser}/story-arcs`);
    });



module.exports = router;
