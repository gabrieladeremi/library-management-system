const Admin = require('../model/admin');
const Borrower = require('../model/borrower');

const { BadRequestError, ForbiddenError } = require('../response/responseMessage');
const { verifyPassword } = require('../security/hash');

/**
 * Registers a new service with the provided user details.
 *
 * @param {string} fullName - the full name of the user
 * @param {string} email - the email of the user
 * @param {string} password - the password of the user
 * @return {boolean} true if the service is registered successfully
 */
exports.registerService = async (fullName, email, password) => {
    email = email.toLowerCase().trim();

    const user = await Admin.findOne({ email: email });
    
    if (user) {
        throw new BadRequestError(
            'User already registered with this email address'
        );
    }

    const newAdminUserDetails = await new Admin({
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        password: password,
    });

    await newAdminUserDetails.save();

    return true;
};

/**
 * Function to handle user login.
 *
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @param {string} type - The type of user (admin or borrower)
 * @return {object} The payload containing user information
 */
exports.loginService = async (email, password, type) => {

    const user = type === 'admin' ?
        await Admin.findOne({ email: email.toLowerCase() }) :
        await Borrower.findOne({ email: email.toLowerCase() });   
    
    
    if (!user) {
        throw new ForbiddenError('Invalid email or password');
    }
    
    if (!user || !(await verifyPassword(password, user.password))) {
        throw new BadRequestError('Incorrect password');
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: type === 'admin' ? 'admin' : 'borrower',
        fullName: user.fullName,
    };

    return payload;
};