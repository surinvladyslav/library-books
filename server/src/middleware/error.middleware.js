const BaseErrors = require('../error')

module.exports = function(err, req, res, next) {
    if(err instanceof BaseErrors) {
        return res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message: err.message})
    return next()
}