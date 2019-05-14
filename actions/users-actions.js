const table = 'users';
const model = require(appRoot + '/db/models/Model')(table);
const helper = require(appRoot + '/helpers/basichelper');
const errors = require(appRoot + '/actions/errors');
const users = {};

/**
 * Send the users list (id and pseudo)
 * @param req
 * @param res
 * @param next
 */
users.listUsers = (req, res, next) => {
    const fields = ['id_user', 'pseudo_user'];
    model.read(fields, {}, (results) => {
        res.json(results);
    });
}

// TODO
/**
 * Adds an user to the database. Sends a 400 error if data is wrong
 * @param req
 * @param res
 * @param next
 */
users.addUser = (req, res, next) => {

    /* Check the imput */
    if (!req.body.pseudo_user || !req.body.password_user || !req.body.email_user) {
        errors.addErrorMessage(1, "Bad Request - Your request is missing parameters");
    }
    if (req.body.pseudo_user.length < 4) {
        errors.addErrorMessage(2, "Bad Request - Your pseudo length has to be > 3");
    }
    if (req.body.password_user.length < 5) {
        errors.addErrorMessage(3, "Bad Request - Your password length has to be > 4");
    }

    /* Send errors input if there is sny */
    if (errors.defined()) {
        errors.sendErrors(res, 400);

        /* Creates the user */
    } else {
            model.create(req.body, {}, (results, error) => {
                if (error) {
                    console.log(error);
                    res.send('BENMERDE');
                } else {
                    res.send(results);
                }

            });

    }

}

module.exports = users;