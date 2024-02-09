const Joi = require("joi");

const authorSchema = Joi.object({
    fullName: Joi.required(),
    dateOfBirth: Joi.string(),
    nationality: Joi.string(),
    biography: Joi.string(),
});

module.exports = {
    authorSchema,
};
