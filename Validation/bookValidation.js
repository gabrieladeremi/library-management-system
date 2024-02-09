const Joi = require("joi");

const bookSchema = Joi.object({
    title: Joi.string().required().min(3).max(150),
    isbn: Joi.string().required().max(30),
    genre: Joi.string(),
    publishedDate: Joi.string().required(),
    publisher: Joi.string(),
    description: Joi.string().required().min(3).max(300),
    copies: Joi.number().required().min(1),
    authorId: Joi.string().required(),
});

module.exports = {
    bookSchema,
};
