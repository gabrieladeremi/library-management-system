const mongoose = require("mongoose");

const { hashPassword } = require("../security/hash");

const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBorrowerInput:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - address
 *         - phoneNumber
 *         - password
 *         - confirmPassword
 *       properties:
 *         fullName:
 *           type: string
 *           default: John Doe
 *         email:
 *           type: string
 *           default: 0Sb6N@example.com
 *         address:
 *           type: string
 *           default: Test Address
 *         phoneNumber:
 *           type: string
 *           default: 123456789
 *         password:
 *           type: string
 *           default: Test@broker123
 *         confirmPassword:
 *           type: string
 *           default: Test@broker123
 *     CreateBookBorrowInput:
 *       type: object
 *       required:
 *         - book
 *       properties:
 *         book:
 *           type: array
 *           items:
 *             properties:
 *               id:
 *                 type: string
 *               copy:
 *                 type: number
 *     UpdateBookBorrowInput:
 *       type: object
 *       required:
 *         - book
 *       properties:
 *         book:
 *           type: array
 *           items:
 *             properties:
 *               id:
 *                 type: string
 *     CreateBorrowerResponse:
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
 *     CreateBookBorrowResponse:
 *       type: object
 *       properties:
 *         status:
 *           value: true
 *         message:
 *           value: Book Borrowed has been created successfully
 *         error:
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *              _id:
 *                 type: string
 *              fullName:
 *                 type: string
 *              email:
 *                 type: string
 *              address:
 *                 type: string
 *              phoneNumber:
 *                 type: string
 *              books:
 *                 type: array
 *                 items:
 *                    type: string
 *              createdAt:
 *                 type: string
 *              updatedAt:
 *                 type: string
 *              __v:
 *                 type: number 
 *     Borrowers:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - error
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           value: true
 *         message:
 *           type: string
 *           value: Fetched successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: array
 *           items:
 *              properties:
 *                 _id:
 *                   type: string
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 books:
 *                   type: array
 *                   items:
 *                      type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 __v:
 *                   type: number     
 *     Borrower:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - error
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           value: true
 *         message:
 *           type: string
 *           value: Fetched successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *              _id:
 *                 type: string
 *              fullName:
 *                 type: string
 *              email:
 *                 type: string
 *              address:
 *                 type: string
 *              phoneNumber:
 *                 type: string
 *              books:
 *                 type: array
 *                 items:
 *                    type: string
 *              createdAt:
 *                 type: string
 *              updatedAt:
 *                 type: string
 *              __v:
 *                 type: number
 *     DeleteBorrower:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - error
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           value: true
 *         message:
 *           type: string
 *           value: Borrower has been deleted successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *              _id:
 *                 type: string
 *              fullName:
 *                 type: string
 *              email:
 *                 type: string
 *              address:
 *                 type: string
 *              phoneNumber:
 *                 type: string
 *              books:
 *                 type: array
 *                 items:
 *                    type: string
 *              createdAt:
 *                 type: string
 *              updatedAt:
 *                 type: string
 *              __v:
 *                 type: number
 */
const borrowerSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your fullname'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
    },
    address: {
        type: String,
        required: [true, 'Please provide your address'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number'],
    },
    password: {
        type: String,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
}, { timestamps: true });

// Hook to encrypt password before saving
borrowerSchema.pre('save', async function (next) {
    if (!this.isModified('password') && !this.isNew) return next();

    this.password = await hashPassword(this.password);
    next();
});


const Borrower = mongoose.model(
    'Borrower',
    borrowerSchema
);

module.exports = Borrower;