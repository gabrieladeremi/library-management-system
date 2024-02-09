const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    isbn: {
        type: String,
        required: [true, 'Please provide an ISBN'],
        unique: true,
    },
    genre: {
        type: String,
    },
    publisher: {
        type: String,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        default: 0
    },
    borrowedCopyCount: {
        type: Number,
        default: 0
    },
    publishedAt: {
        type: Date,
    },
}, { timestamps: true });

const Book = mongoose.model(
    'Book',
    bookSchema
);

module.exports = Book;