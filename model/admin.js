const mongoose = require("mongoose");

const { hashPassword } = require("../security/hash");

const Schema = mongoose.Schema;

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