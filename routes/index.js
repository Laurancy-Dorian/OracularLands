var express = require('express');
var router = express.Router();

/**
 *  Sub ressources
 */
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/story-arcs', require('./story-arcs'));
router.use('/sessions', require('./sessions'));

module.exports = router;
