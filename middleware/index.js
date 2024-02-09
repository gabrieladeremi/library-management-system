const { verifyAccessToken } = require('../security/token');
const { ForbiddenError } = require('../response/responseMessage');

exports.verifyToken = async (req, res, next) => {
    try {
        const authorization = req.get('Authorization');
        if (!authorization) {
            throw new ForbiddenError('Invalid token, login again');
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            throw new ForbiddenError('Invalid token, login again');
        }

        const decoded = await verifyAccessToken(token);
        if (
            decoded &&
            decoded.name !== 'JsonWebTokenError' &&
            decoded.name !== 'TokenExpiredError'
        ) {
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
                fullname: decoded.fullname
            };

            next();
        } else if (decoded.name === 'TokenExpiredError') {
            throw new ForbiddenError('Expired token, please refresh');
        } else if (decoded.name === 'JsonWebTokenError') {
            throw new ForbiddenError('Invalid token, login again');
        } else {
            throw new ForbiddenError('Expired token, please refresh');
        }
    } catch (error) {
        next(error);
    }
};
