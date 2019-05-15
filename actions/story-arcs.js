const table = 'story_arc';
const model = require(appRoot + '/db/models/Model')(table);
const errorAction = require(appRoot + '/actions/errors');
const auth = require(appRoot + '/actions/auth');



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
// TODO
/**
 * Creates a new storyArc
 */
storyArcs.addStoryArc = (req, res, next) => {
    console.log(req.files)
    res.end();
}

module.exports = storyArcs;