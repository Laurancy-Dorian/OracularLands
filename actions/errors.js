
const errors = {};

errors.err = {
    errors: []
};

errors.sendErrors = (res, codeHTTP) => {
    res.status(codeHTTP).json(errors.err);
}

errors.addErrorMessage = (code, message) => {
    errors.err.errors.push({
        code: code,
        message: message
    });

}

errors.defined = () => {
    return (errors.err.errors.length > 0);
}

module.exports = errors;