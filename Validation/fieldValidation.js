const Joi = require("joi");

const borrowerSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().label("Full Name"),
    email: Joi.string().email({ minDomainSegments: 2 }),
    address: Joi.string().required().label("Address"),
    phoneNumber: Joi.string().required().label("Phone Number"),
    password: Joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
        .min(8)
        .max(30)
        .required()
        .label(
            "Please enter a password that is between 8 to 30, made of a number, a special symbol, a capital letter and a small letter"
        ),
    confirmPassword: Joi.ref("password"),
});

const adminSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().label("Full Name"),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
        .min(8)
        .max(30)
        .required()
        .label(
            "Please enter a password that is between 8 to 30, made of a number, a special symbol, a capital letter and a small letter"
        ),
    confirmPassword: Joi.ref("password"),
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(8).max(30).required(),
    type: Joi.string().valid("borrower", "admin"),
});

module.exports = {
    borrowerSchema,
    adminSchema,
    loginSchema,
};
