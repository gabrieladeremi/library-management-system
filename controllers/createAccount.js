const { BadRequestError } = require("../response/responseMessage");
const AppSuccess = require("../response/responseProcessor");

const { createBorrowerAccountService } = require("../services/index");

const borrowerAccount = async (req, res, next) => {
    try {
        const { fullName, email, address, phoneNumber, password, confirmPassword } = req.body;

        if (!fullName || !email || !address || !phoneNumber || !password || !confirmPassword) {
            throw new BadRequestError('Your details are Incomplete');
        }
        await createBorrowerAccountService(fullName, email, address, phoneNumber, password);

        return new AppSuccess(res).ACCOUNTCREATED();

    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

module.exports = borrowerAccount;