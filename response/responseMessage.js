class BadRequestError extends Error {
    constructor(message, data) {
        super(message);
        this.statusCode = 400;
        this.data = data || {};
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    ForbiddenError,
};
