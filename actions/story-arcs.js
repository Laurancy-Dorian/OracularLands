const table = 'story_arc';
const model = require(appRoot + '/db/models/Model')(table);
const errorAction = require(appRoot + '/helpers/errors');
const auth = require(appRoot + '/actions/auth');

const fileSaving = require(appRoot + '/helpers/file-saving');

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
    console.log(req.files)

    fileSaving.moveFiles(req.files,imagesFolder + req.dataToken.user.pseudo_user, () => res.status(201).end());

}

module.exports = storyArcs;