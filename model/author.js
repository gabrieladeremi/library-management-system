const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your fullname'],
    },
    dateOfBirth: {
        type: String,
    },
    nationality: {
        type: String,
    },
    biography: {
        type: String,
    },
}, { timestamps: true });

const Author = mongoose.model(
    'Author',
    authorSchema
);

module.exports = Author;