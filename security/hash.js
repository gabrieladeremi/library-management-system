const bcrypt = require('bcryptjs');

/**
 * Hashes a password using bcrypt with a cost factor of 12.
 *
 * @param {string} password - The password to be hashed.
 * @return {Promise<string>} The hashed password.
 */
exports.hashPassword = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, 12);
        return hashed;
    } catch (error) {
        return false;
    }
};

/**
 * Verifies the password by comparing it with the hashed password.
 *
 * @param {string} password - The password to be verified.
 * @param {string} hashed - The hashed password to compare with.
 * @return {boolean} Returns true if the password matches the hashed password, otherwise false.
 */
exports.verifyPassword = async (password, hashed) => {
    try {
        const doMatch = await bcrypt.compare(password, hashed);
        return doMatch;
    } catch (error) {
        return false;
    }
};