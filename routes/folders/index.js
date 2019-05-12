var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send('GET /folders');
    })
    .post(function (req, res, next) {
        res.send('POST /folders');
    });

router.route('/:idFolder')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idFolder)) {
            res.send(`GET folders/${req.params.idFolder}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .patch(function (req, res, next) {
        if (!isNaN(req.params.idFolder)) {
            res.send(`PATCH folders/${req.params.idFolder}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idFolder)) {
            res.send(`DELETE folders/${req.params.idFolder}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

/**
 *  Sub ressources
 */

const addIdFolderToRouter = (req, res, next) => {
    req.idFolder = req.params.idFolder;
    next();
};

router.use('/:idFolder/subfolders', addIdFolderToRouter, require('./subfolders'));
router.use('/:idFolder/files', addIdFolderToRouter, require('./files'));


module.exports = router;
