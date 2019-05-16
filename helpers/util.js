const util = {};

util.isObjectEmpty = (obj) => {
    return Object.keys(obj).length == 0;
}

util.toTitleCase = (str) => {
    if (typeof str != 'undefined') {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } else {
        return str;
    }

}

module.exports = util;