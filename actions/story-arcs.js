/* Loads the model */
const model = require(appRoot + '/db/models/Model')('story_arc');

/* Loads other actions */
const auth = require(appRoot + '/actions/auth');

/* Loads helpers */
const errorHelper = require(appRoot + '/helpers/errors');
const util = require (appRoot + '/helpers/util');
const fileSaving = require(appRoot + '/helpers/file-saving'); /* For saving the image of the story arc*/
const mime = require('mime');

/* Init constant variables */
const imagesFolder = './userspublic/story-arcs-images/';

const storyArcs = {};

/**
 * Sends the storyarcs list (id and pseudo)
 */
storyArcs.listStoryArcs = (req, res, next) => {
    const fields = ['*'];
    model.read(fields, {}, (results) => {
        res.json(results);
    });
}

/**
 * Creates a new storyArc
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

storyArcs.setImageToArc = (files, id_story_arc, callback) => {
    if (typeof files != 'undefined') {
        if (files.length > 0) {
            // Sets the filename
            files[0].filename = id_story_arc + '.' +mime.getExtension(files[0].mimetype);

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

storyArcs.sendError = (codeHTTP, customCode, msg, req, res) => {
    let errors = errorHelper();
    fileSaving.deleteFiles(req.files);  // Delete files sent from tmp
    errors.addErrorMessage(customCode,msg);
    errors.sendErrors(res, codeHTTP);
}



module.exports = storyArcs;