module.exports = class BaseErrors extends Error {
    status;

    constructor(message, status) {
        super(message);
        this.status = status;
    }

    static UnouthorizedError(message) {
        return new BaseErrors(message || 'user not authorized', 401)
    }

    static NotFound(message) {
        return new BaseErrors(message, 404)
    }

    static BadRequest(message) {
        return new BaseErrors(message, 400)
    }
}
