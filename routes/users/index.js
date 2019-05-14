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
    .delete(function (req, res, next) {
        if (!isNaN(req.params.idUser)) {
            res.send(`DELETE user ${req.params.idUser}`);
        } else {
            res.status(400).send('Bad Request');
        }
    });

/**
 *  Sub ressources
 */
router.use('/:idUser/story-arcs', addIdUserToRouter, require('./story-arcs'));
router.use('/:idUser/sessions', addIdUserToRouter, require('./sessions'));
router.use('/:idUser/sessions-playing', addIdUserToRouter, require('./sessions-playing'));
router.use('/:idUser/folders', addIdUserToRouter, require('./folders'));


module.exports = router;
