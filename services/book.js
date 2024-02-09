const Book = require("../model/books");
const mongoose = require("mongoose");

const { BadRequestError, NotFoundError } = require("../response/responseMessage");

/**
 * Creates a new book service with the provided details.
 *
 * @param {string} authorId - The ID of the author
 * @param {string} title - The title of the book
 * @param {string} description - The description of the book
 * @param {string} isbn - The ISBN of the book
 * @param {string} genre - The genre of the book
 * @param {Date} publishedDate - The published date of the book
 * @param {string} publisher - The publisher of the book
 * @param {number} quantity - The quantity of the book
 * @return {Promise<Book>} A promise that resolves to the saved book object
 */
exports.createBookService = async (
        authorId,
        title,
        description,
        isbn,
        genre,
        publishedDate,
        publisher,
        copies
    ) => {

    const doesBookExist = await Book.findOne({ title: title, isbn: isbn });

    if (doesBookExist) {
        throw new BadRequestError(`Book with title: ${title} or ISBN: ${isbn} already exists`);
    }

    const book = new Book({
        authorId,
        title,
        description,
        isbn,
        genre,
        publishedDate,
        publisher,
        copies
    });

    return await book.save();
}

/**
 * Retrieves a list of books along with author information, based on the provided query parameters.
 *
 * @param {Object} query - The query parameters for pagination (page and limit).
 * @return {Object} An object containing the list of books, total number of pages, and total number of books.
 */
exports.listBooksService = async (query) => {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const skip = (page - 1) * limit;

    const books = await Book.aggregate([
        {
            $lookup: {
                from: 'authors',
                localField: 'authorId',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            dateOfBirth: 1,
                            nationality: 1,
                            description: 1,
                        }
                    }
                ],
                as: 'authorInfo',
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ]);

    const totalBooks = await Book.countDocuments();
    const pages = Math.ceil(totalBooks / limit);

    return {
        books,
        pages,
        totalBooks,
    };
}

/**
 * Retrieves a book by its ID and populates the author information.
 *
 * @param {string} id - The ID of the book to retrieve
 * @return {Promise<Book>} The book object
 */
exports.viewBookService = async (id) => {
    const book = await Book.findById(id).populate('authorId');

    if (!book) {
        throw new NotFoundError('Book not found');
    }

    return book;
}

/**
 * Updates a book in the database.
 *
 * @param {string} id - The ID of the book to be updated
 * @param {Object} data - The data to update the book with
 * @return {Promise<Object>} The updated book
 */
exports.updateBookService = async (id, data) => {
    const book = await Book.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { ...data }, { new: true });

    if (!book) {
        throw new NotFoundError('Book not found');
    }

    return book;

}

/**
 * Deletes a book by its ID.
 *
 * @param {string} id - The ID of the book to be deleted
 * @return {Promise<object>} The deleted book
 */
exports.deleteBookService = async (id) => {
    const deletedBook = await Book.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (!deletedBook) {
        throw new NotFoundError('Book not found');
    }

    return deletedBook;
}