const Joi = require("joi");

const bookSchema = Joi.object({
    title: Joi.string().required().min(3).max(30),
    isbn: Joi.string().required().max(13),
    genre: Joi.string(),
    publishedDate: Joi.string().required(),
    publisher: Joi.string(),
    description: Joi.string().required().min(3).max(300),
    quantity: Joi.number().required().min(1),
});

module.exports = {
    bookSchema,
};
