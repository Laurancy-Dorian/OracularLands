var express = require('express');
var router = express.Router();

/**
 *  Routes of this ressource
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 *  Sub ressources
 */
router.use('/users', require('./users'));

module.exports = router;
