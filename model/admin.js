const mongoose = require("mongoose");

const { hashPassword } = require("../security/hash");

const Schema = mongoose.Schema;


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAdminInput:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         fullName:
 *           type: string
 *           default: John Doe
 *         email:
 *           type: string
 *           default: 0Sb6N@example.com
 *         password:
 *           type: string
 *           default: Test@broker123
 *         confirmPassword:
 *           type: string
 *           default: Test@broker123
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - type
 *       properties:
 *         email:
 *           type: string
 *           default: 0Sb6N@example.com
 *         password:
 *           type: string
 *           default: Test@broker123
 *         type:
 *           type: string
 *           value: admin/borrower
 *           default: admin
 *     CreateAdminResponse:
 *       type: object
 *       properties:
 *         status:
 *           value: true
 *         message:
 *           value: Account created successfully
 *         error:
 *           value: null
 *         data:
 *           value: null
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           value: true
 *         message:
 *           value: Account created successfully
 *         error:
 *           value: null
 *         data:
 *           value: object
 */
const adminSchema = new Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
    },
    password: {
        type: String,
    },
},
    { timestamps: true }
);

// Hook to encrypt password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password') && !this.isNew) return next();

    this.password = await hashPassword(this.password);
    next();
});

const Admin = mongoose.model(
    'AdminUser',
    adminSchema
);

module.exports = Admin;