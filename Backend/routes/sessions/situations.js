var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.route('/:idSituation')
    .put(function (req, res, next) {
        res.send(`PUT /session/${req.idSession}/situations/${req.params.idSituation}`);
    })

module.exports = router;
