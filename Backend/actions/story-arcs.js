/* Loads the model */
const model = require(appRoot + '/db/models/Model')('story_arc');

/* Loads helpers and libraries */
const errorHelper = require(appRoot + '/helpers/errors');
const util = require (appRoot + '/helpers/util');
const fileSaving = require(appRoot + '/helpers/file-saving'); /* For saving the image of the story arc*/
const mime = require('mime');

/* Init constant variables */
const imagesFolder = './userspublic/story-arcs-images/';

const storyArcs = {};

/**
 * Sends the storyarcs list (200)
 */
storyArcs.listStoryArcs = (req, res, next) => {
    const sql = 'SELECT * ' +
        'FROM story_arc st, users u ' +
        'WHERE st.id_user = u.id_user';
    pool.query(sql, (errors, results) => {
        res.json(results);
    });
}

/**
 * Load the data of the storyarc with id req.idStoryArc add calls next with results (200)
 * If error : 404
 */
storyArcs.readStoryArc = (req, res, next) => {
    const where = {id_story_arc: req.idStoryArc}
    model.read(['*'], where, (results, error) => {
        if (!error && results != 0) {
            next(results);
        } else {
            let errors = errorHelper();
            errors.addErrorMessage('40402 ', 'Not found - There is no Story Arc with this id');
            errors.sendErrors(res, 404);
        }
    });
}

/**
 * Send the storyArc with id req.idStoryArc
 */
storyArcs.getStoryArc = (req, res, next) => {
    storyArcs.readStoryArc(req, res, (results, error) => {
        res.send(results[0]);
    });
}

/**
 * Creates a new storyArc, saves its image if there is any, and send the id (201)
 * Error 400 if title_story_arc is not defined in body
 * Error 409 if error in database creation
 */
storyArcs.addStoryArc = (req, res, next) => {

    // Check if the tilte is defined
    if (!req.body.title_story_arc) {
        storyArcs.sendError(400, '40001',"Bad Request - Your request is missing parameters" , req, res);
    } else {
        const values = {
            title_story_arc: util.toTitleCase(req.body.title_story_arc),
            description_story_arc: req.body.description_story_arc,
            id_user: req.dataToken.user.id_user
        };

        /* Creates the storyArc */
        model.create(values, {}, (results, error) => {
            if (!error && results.affectedRows != 0) { /* Success */
                const id_story_arc = results.insertId;

                // Sets the image sent
                storyArcs.setImageToArc(req.files, id_story_arc, () => {
                    res.status(201).json({id_story_arc});
                });

            } else {
                storyArcs.sendError(409, '-1', error.sqlMessage, req, res);
            }
        });
    }
}

/**
 * Update a storyArc with id req.idStoryArc, saves its image if there is any, and send (204)
 * Error 400 if title_story_arc is not defined in body
 * Error 409 if error in database creation
 */
storyArcs.updateStoryArc = (req, res, next) => {
    const id_story_arc = req.idStoryArc;

    const values = {};
    if (req.body.title_story_arc) {
        values.title_story_arc = util.toTitleCase(req.body.title_story_arc);
    }
    if (req.body.description_story_arc) {
        values.description_story_arc = req.body.description_story_arc;
    }

    /* Creates the storyArc */
    model.update(values, {id_story_arc}, (results, error) => {
        if (!error) { /* Success */
            // Sets the image sent
            storyArcs.setImageToArc(req.files, id_story_arc, () => {
                res.status(204).end();
            });

        } else {
            storyArcs.sendError(409, '-1', error.sqlMessage, req, res);
        }
    });

}

/**
 * Deletes the storyArc and its image (204)
 * 409 error if db error
 */
storyArcs.deleteStoryArc = (req, res, next) => {
    const id_story_arc = req.idStoryArc;
    model.delete({id_story_arc}, (results, error) => {
        if (!error && results.affectedRows != 0) {
            fileSaving.deleteFiles([{path: './userspublic' + req.storyArcData.image_story_arc}]);
            res.status(204).end();
        } else {
            errors.addErrorMessage('-1', error.sqlMessage);
            errors.sendErrors(res, 409);
        }
    });
}

/**
 * Assign this image to the arc by adding to the filesystem and in the database
 * @param files the req.files variable
 * @param id_story_arc  the id of storyArc
 * @param callback
 */
storyArcs.setImageToArc = (files, id_story_arc, callback) => {
    if (typeof files != 'undefined') {
        if (files.length > 0)  {
            // Sets the filename
            files[0].filename = id_story_arc + '.' + mime.getExtension(files[0].mimetype);

            // Moves the file from tmp to /userspublic/story-arcs-images/
            fileSaving.moveFiles([files[0]], imagesFolder, () => {

                // Store the link to access this image in the database
                const pathFile = '/story-arcs-images/' + files[0].filename;

                const value = {image_story_arc: pathFile};
                const where = {id_story_arc};
                model.update(value, where, (results, error) => {
                    // If the user sent more than 1 image, deletes all files from tmp
                    if (files.length > 1) {
                        fileSaving.deleteFiles(files);
                    }
                    callback();
                });
            });
        } else {
            callback();
        }
    } else {
        callback();
    }
}

/**
 * Check if the user is the owner of this storyArc
 * calls next if it's the case
 * Error 403 if not
 */
storyArcs.checkRights = (req, res, next) => {
    storyArcs.readStoryArc(req, res, (results, error) => {
        if (results[0].id_user == req.dataToken.user.id_user) {
            req.storyArcData = results[0];
            next();
        } else {
            let errors = errorHelper();
            errors.addErrorMessage('40304', 'Forbidden - You do not have the rights to edit this Story Arc');
            errors.sendErrors(res, 403);
        }
    });
}

/**
 * Deletes the files in tmp and then send the error
 * DO NOT use this function if you didn't upload files
 */
storyArcs.sendError = (codeHTTP, customCode, msg, req, res) => {
    let errors = errorHelper();
    if (typeof req.files != 'undefined') {
        fileSaving.deleteFiles(req.files);  // Delete files sent from tmp
    }
    errors.addErrorMessage(customCode,msg);
    errors.sendErrors(res, codeHTTP);
}



module.exports = storyArcs;