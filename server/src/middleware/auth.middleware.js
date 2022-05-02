const BaseErrors = require("../error");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next){
    if (!req.headers.authorization) {
        throw next(BaseErrors.UnouthorizedError())
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        throw next(BaseErrors.UnouthorizedError());
    }

    await jwt.verify(token, process.env.ACCESS_SECRET_KEY, function (err, decoded) {
        if (err) {
            throw next(BaseErrors.UnouthorizedError(err.message))
        }
        req.id = decoded.id
    })

    // try {
    //     const decoded = await jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    //     req.id = decoded.id
    // } catch(err) {
    //     throw next(BaseErrors.UnouthorizedError(err.message))
    // }

    next()
};

