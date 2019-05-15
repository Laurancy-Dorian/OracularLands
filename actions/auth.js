const errorAction = require(appRoot + '/actions/errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const modelUser = require(appRoot + '/db/models/Model')('users');

const auth = {};

/**
 * Get the token from the Authorization header and add it to req
 * Send a 403 error if Authorization header is not set
 *
 * Header format
 * Authorization : Bearer <access_token>
 */
auth.getToken = (req, res, next) => {
    /* Get the auth header value */
    const bearerHeader = req.headers['authorization'];

    /* Check if bearer is undefined */
    if (typeof bearerHeader !== 'undefined') {
        /* Split at the space */
        const bearer = bearerHeader.split(' ');

        /* Get token from array */
        const bearerToken = bearer[1];

        /* Set the token */
        req.token = bearerToken;

        next();
    } else {
        /* Forbidden */
        let errors = errorAction();
        errors.addErrorMessage('40301', 'Forbidden - Header Authorization is not defined');
        errors.sendErrors(res, 403);
    }
}

/**
 * verify the token,
 * Calls next with the data in token if succees
 * Sends a 403 error else
 * @param token the token
 * @param next  the callback function to call next
 */
auth.verifyToken = (req, res, next) => {
    let errors = errorAction();
    if (!req.token) {
        console.log("Inaccessible Token : call auth.getToken before");
    }
    jwt.verify(req.token, config.jwtSecret, (err, data) => {
        if (err) {
            errors.addErrorMessage('40302', 'Forbidden - Invalid token');
            errors.sendErrors(res, 403);
        }
        else {
            next(data);
        }
    });
}

/**
 * Login the user
 * Check if the pseudo and password in the body match the data in db, and generate a token if so
 * Sends a 403 error else.
 */
auth.login = (req, res, next) => {
    let errors = errorAction();

    // check user and password and take data relative to it
    const pseudo = req.body.pseudo_user;
    const password = req.body.password_user;

    // Fetch the data in db
    const select = ['id_user', 'pseudo_user', 'password_user'];
    const where = {pseudo_user: pseudo}
    modelUser.read(select, where, (results, err) => {

        if (!err && results.length > 0) {
            // Compare the passwords
            bcrypt.compare(password, results[0].password_user, (err, resEncrypt) => {
                if (resEncrypt) {
                    const user = {
                        id_user: results[0].id_user,
                        pseudo_user: results[0].pseudo_user
                    }
                    // Creates the token
                    jwt.sign({user}, config.jwtSecret, (err, token) => {
                        res.json({token});
                    });
                } else {
                    errors.addErrorMessage('40007', 'Invalid password');
                    errors.sendErrors(res, 403);
                }
            });
        } else {
            errors.addErrorMessage('40006', 'Invalid username');
            errors.sendErrors(res, 403);
        }
    });
}

auth.logout = () => {

}

module.exports = auth;