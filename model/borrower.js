const mongoose = require("mongoose");

const { hashPassword } = require("../security/hash");

const Schema = mongoose.Schema;

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