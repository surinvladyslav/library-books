module.exports = class CustomError extends Error {
    status;

    constructor(message, status) {
        super(message);
        this.status = status;
    }

    static UnouthorizedError(message) {
        return new CustomError(message || 'user not authorized', 401)
    }

    static NotFound(message) {
        return new CustomError(message, 404)
    }

    static BadRequest(message) {
        return new CustomError(message, 400)
    }
}
