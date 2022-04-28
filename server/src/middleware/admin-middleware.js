const CustomError = require("../error");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next){
    if (!req.headers.authorization) {
        throw next(CustomError.UnouthorizedError())
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        throw next(CustomError.UnouthorizedError());
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, function (err, decoded) {
        if (err) {
            throw next(CustomError.UnouthorizedError(err.message))
        }
        req.id = decoded.id
    })

    next()
};
