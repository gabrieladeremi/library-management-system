const { session } = require("../connection/mongoDb");

const { NotFoundError } = require("../response/responseMessage");
const AppSuccess = require("../response/responseProcessor");

const { registerService } = require("../services/index");

const register = async (req, res, next) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if ( !fullName|| !email || !password || !confirmPassword) {
            throw new NotFoundError('Your details are Incomplete');
        }
        await registerService( fullName,email, password);

        return new AppSuccess(res).ACCOUNTCREATED();

    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

module.exports = register;