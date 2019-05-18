var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/:idScenario')
    .put(function (req, res, next) {
        res.send(`PUT /sessions/${req.idSession}/scenarios/${req.params.idScenario}`);
    });

module.exports = router;
