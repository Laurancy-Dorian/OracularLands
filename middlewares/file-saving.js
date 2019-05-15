var multer = require('multer'); // v1.0.5
var mime = require('mime');

var fileSaving = {};

/**
 * Initialise multer so that it will save the files with fieldName in path
 * @param path          The folder to save the images (relative to root)
 * @param fieldName     The name of fields of the files in form data
 */
fileSaving.set = (path, fieldName) => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, appRoot + path)
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}` + '.' + mime.getExtension(file.mimetype))
        }
    });

    return multer({storage: storage}).array(fieldName);
}


module.exports =  fileSaving;