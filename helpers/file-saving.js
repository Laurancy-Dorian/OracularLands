var multer = require('multer'); // v1.0.5
var mime = require('mime');

const fs = require('fs');

var fileSaving = {};

/**
 * Initialise multer so that it will save the files in path
 * @param path          The folder to save the images (relative to root), default is /tmp
 */
fileSaving.setMulter = (path) => {
    if (!path) {
        path = '/tmp';
    }
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, appRoot + path)
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}` + '.' + mime.getExtension(file.mimetype))
        }
    });

    return multer({storage: storage}).any();
}

/**
 * Moves the files in 'files' from to 'dest'
 * The new files will have the name 'filename' (see param files'
 * It creates the folders of 'dest' if they aren't already.
 * The initial files will be deleted
 * @param files  An array of objects that contain the path of the file
 *                  ==> You can also use req.files given by multer middleware
 *               This array contains objects on the form : [
 *                                                            {
 *                                                            filename: <nameOfFile>,
 *                                                            path : <path>
 *                                                            }
 *                                                         ]
 * @param dest  The path of the folder where to move those files. ex :'./folder/images'
 * @callback The callback function
 */
fileSaving.moveFiles = (files, dest, callback) => {
    fileSaving.mkdir(dest, () => {  // Creates the folder if it doesn't exists
        files.forEach((file) => {
            // dest will be created or overwritten
            fs.copyFile(file.path, dest + '/' + file.filename, (err) => {
                if (err) throw err;
                fileSaving.deleteFiles([file]);    // Removes the file from tmp
                if (callback) {
                    callback();
                }
            });
        });
    });
}

/**
 * Creates reccursively the folders in path. This does nothing if the folder already exists
 * ex : /folder/f/images    will create /folder, /f and /images if they aren't already
 * @param path      The path of the new folder (ex :'./folder/images'). Creates its parents if they aren't already
 * @param callback  The callback function to call next
 */
fileSaving.mkdir = (path, callback) => {
    // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err;
        if (callback) {
            callback();
        }
    });
}


/**
 * Removes the files from tmp
 * @param files  An array of objects that contain the path of the file
 *                  ==> You can also use req.files given by multer middleware
 *               This array contains objects on the form ; [
 *                                                            {path : ''},
 *                                                            {path : ''}
 *                                                         ]
 */
fileSaving.deleteFiles = (files) => {
    files.forEach((file) => {
        fs.unlink(file.path, (err) => {
            if (err) throw err;
        });
    });
}

/**
 * Delete all a folder and its content (folders or file)
 * @param path  The path of the folder (ex :'./folder/images')
 */
fileSaving.deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

module.exports =  fileSaving;