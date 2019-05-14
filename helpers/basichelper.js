const helper = {};

helper.isObjectEmpty = (obj) => {
    return Object.keys(obj).length;
}

module.exports = helper;