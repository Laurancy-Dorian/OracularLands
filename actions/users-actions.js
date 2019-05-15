const table = 'users';
const model = require(appRoot + '/db/models/Model')(table);
const helper = require(appRoot + '/helpers/basichelper');
const errorAction = require(appRoot + '/actions/errors');
const bcrypt = require('bcrypt');


const users = {};

/**
 * Sends the users list (id and pseudo)
 */
users.listUsers = (req, res, next) => {
    const fields = ['id_user', 'pseudo_user'];
    model.read(fields, {}, (results) => {
        res.json(results);
    });
}

/**
 * Adds an user to the database.
 * Sends a 400 error if data is wrong
 */
users.addUser = (req, res, next) => {
    let errors = errorAction();

    /* Check the input */
    if (!req.body.pseudo_user || !req.body.password_user || !req.body.email_user) {
        errors.addErrorMessage('01', "Bad Request - Your request is missing parameters");
    }
    if (req.body.pseudo_user && req.body.pseudo_user.length < 4) {
        errors.addErrorMessage('02', "Bad Request - Your pseudo length has to be > 3");
    }
    if (req.body.password_user && req.body.password_user.length < 5) {
        errors.addErrorMessage('03', "Bad Request - Your password length has to be > 4");
    }

    const emailValidator = require('email-validator');
    if (req.body.email_user && !emailValidator.validate(req.body.email_user)) {
        errors.addErrorMessage('04', "Bad Request - Invalid Email");
    }

    /* Send errors input if there is sny */
    if (errors.defined()) {
        errors.sendErrors(res, 400);
    } else {
        /* Hash the password */
        bcrypt.hash(req.body.password_user, 10, function(err, hash) {

            req.body.password_user = hash;

            /* Creates the user */
            model.create(req.body, {}, (results, error) => {
                if (!error) { /* Success */
                    res.status(201).json({'id_user': results.insertId});
                } else {
                    if (error.code == 'ER_DUP_ENTRY') { /* Database error */
                        errors.addErrorMessage('10', "Pseudo or email already used - " + error.sqlMessage);
                    } else {
                        errors.addErrorMessage('-1', error.sqlMessage);
                    }
                    errors.sendErrors(res, 409);
                }
            });
        });
    }

}

/**
 * Gets an user to the database.
 * Sends a 404 error if the id is wrong
 */
users.getUser = (req, res, next) => {
    let errors = errorAction();
    const fields = ['id_user', 'pseudo_user', 'email_user'];
    const where = {'id_user': req.idUser};
    model.read(fields, where, (results, error) => {
        if (!error && results.length > 0) {
            res.json(results);
        } else {
            errors.addErrorMessage('01', 'Error 404 - There is no user with this id');
            errors.sendErrors(res, 404);
        }
    });
}


users.updateUser = (req, res, next) => {
    let errors = errorAction();

    /* Check the input */
    if (req.body.pseudo_user && req.body.pseudo_user.length < 4) {
        errors.addErrorMessage('02', "Bad Request - Your pseudo length has to be > 3");
    }
    if (req.body.password_user && req.body.password_user.length < 5) {
        errors.addErrorMessage('03', "Bad Request - Your password length has to be > 4");
    }

    const emailValidator = require('email-validator');
    if (req.body.email_user && !emailValidator.validate(req.body.email_user)) {
        errors.addErrorMessage('04', "Bad Request - Invalid Email");
    }

    /* Send errors input if there is sny */
    if (errors.defined()) {
        errors.sendErrors(res, 400);
    } else {
        /* Hash the password */
        bcrypt.hash(req.body.password_user, 10, function(err, hash) {
            req.body.password_user = hash;

            const where = {'id_user': req.idUser};

            /* updates the user */
            model.update(req.body, where, (results, error) => {
                if (!error) { /* Success */
                    res.status(204).end();
                } else {
                    if (error.code == 'ER_DUP_ENTRY') { /* Database error */
                        errors.addErrorMessage('10', "Pseudo or email already used - " + error.sqlMessage);
                    } else {
                        errors.addErrorMessage('-1', error.sqlMessage);
                    }
                    errors.sendErrors(res, 409);
                }
            });
        });
    }
}

/**
 * Deletes the user
 * Return a 404
 * @param req
 * @param res
 * @param next
 */
users.deleteUser = (req, res, next) => {
    let errors = errorAction();
    const where = {'id_user': req.idUser};
    model.delete(where, (results, error) => {
        if (!error && results.affectedRows != 0) {
            res.status(204).end();
        } else {
            errors.addErrorMessage('01', 'Error 404 - There is no user with this id');
            errors.sendErrors(res, 404);
        }
    });
}

module.exports = users;