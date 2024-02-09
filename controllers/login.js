const { loginService } = require("../services/index");
 
const { createLoginToken } = require("../utils/generateLoginToken")
const AppSuccess = require("../response/responseProcessor");


const login = async (req, res, next) => {
    try {
        const { email, password, type } = req.body;

        const payload = await loginService(email, password, type);
        const token = await createLoginToken(payload);

        return new AppSuccess(res, { ...token }).TOKENCREATED();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

module.exports = login;