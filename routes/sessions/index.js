var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /sessions`);
    });

router.route('/:idSession')
    .get(function (req, res, next) {
        res.send(`GET /sessions/${req.params.idSession}`);
    })
    .patch(function (req, res, next) {
        res.send(`PATCH /sessions/${req.params.idSession}`);
    })
    .delete(function (req, res, next) {
        res.send(`DELETE /sessions/${req.params.idSession}`);
    });

/**
 *  Sub ressources
 */

const addIdSessionToRouter = (req, res, next) => {
    req.idSession = req.params.idSession;
    next();
};

router.use('/:idSession/folders', addIdSessionToRouter, require('./folders'));
router.use('/:idSession/files', addIdSessionToRouter, require('./files'));


module.exports = router;
