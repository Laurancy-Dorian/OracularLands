var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/')
    .get(function (req, res, next) {
        res.send(`GET /sessions/${req.idSession}/character-sheets`);
    });

router.route('/:idCharacterSheet')
    .get(function (req, res, next) {
        if (!isNaN(req.params.idCharacterSheet)) {
            res.send(`GET /sessions/${req.idSession}/character-sheet/${req.params.idCharacterSheet}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .patch(function (req, res, next) {
        if (!isNaN(req.params.idCharacterSheet)) {
            res.send(`PUT /sessions/${req.idSession}/character-sheet/${req.params.idCharacterSheet}`);
        } else {
            res.status(400).send('Bad Request');
        }
    })
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idCharacterSheet)) {
            res.send(`DELETE /sessions/${req.idSession}/character-sheet/${req.params.idCharacterSheet}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });


/**
 *  Sub ressources
 */



module.exports = router;
