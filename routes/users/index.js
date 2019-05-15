var express = require('express');
var router = express.Router();

const userActions = require (appRoot + '/actions/users-actions');
/**
 *  Routes of this ressource
 */
const addIdUserToRouter = (req, res, next) => {
    req.idUser = req.params.idUser;
    next();
};
router.route('/')
    .get(userActions.listUsers)
    .post(userActions.addUser);

router.route('/:idUser')
    .get(addIdUserToRouter, userActions.getUser)
    .patch(addIdUserToRouter, userActions.updateUser)
    .delete(addIdUserToRouter, userActions.deleteUser);

/**
 *  Sub ressources
 */
router.use('/:idUser/story-arcs', addIdUserToRouter, require('./story-arcs'));
router.use('/:idUser/sessions', addIdUserToRouter, require('./sessions'));
router.use('/:idUser/sessions-playing', addIdUserToRouter, require('./sessions-playing'));
router.use('/:idUser/folders', addIdUserToRouter, require('./folders'));


module.exports = router;
