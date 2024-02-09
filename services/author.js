const Author = require("../model/author");
const Book = require("../model/books");
const { BadRequestError, NotFoundError } = require("../response/responseMessage");
const mongoose = require("mongoose");

/**
 * Creates a new author service with the given information.
 *
 * @param {string} fullName - The full name of the author
 * @param {string} dateOfBirth - The date of birth of the author
 * @param {string} nationality - The nationality of the author
 * @param {string} biography - The biography of the author
 * @return {Promise} Returns a Promise that resolves to the saved author object
 */
exports.createAuthorService = async (fullName, dateOfBirth, nationality, biography) => {

    const doesAuthorExist = await Author.findOne({ fullName });

    if (doesAuthorExist) {
        throw new BadRequestError('Author already exists');
    }

    const author = new Author({
        fullName,
        dateOfBirth,
        nationality,
        biography
    });

    return await author.save();
}

/**
 * Retrieves a list of authors along with their book information, paginated based on the provided query parameters.
 *
 * @param {Object} query - Object containing page and limit for pagination
 * @return {Object} Object containing authors, pages, and totalAuthors
 */
exports.listAuthorService = async (query) => {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const skip = (page - 1) * limit;

    const authors = await Author.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: 'authorId',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            isbn: 1,
                            description: 1,
                            quantity: 1,
                        }
                    }
                ],
                as: 'bookInfo',
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

    const totalAuthors = await Author.countDocuments();
    const pages = Math.ceil(totalAuthors / limit);

    return {
        authors,
        pages,
        totalAuthors,
    };
}

/**
 * Retrieves the author with the specified ID.
 *
 * @param {string} id - The ID of the author to retrieve
 * @return {Promise<Author>} The retrieved author object
 */
exports.viewAuthorService = async (id) => {
    const author = await Author.findById(id);

    if(!author) {
        throw new NotFoundError('Author not found');
    }

    return author;
}

/**
 * Update author service by ID.
 *
 * @param {string} id - The ID of the author to update.
 * @param {object} data - The data to update the author with.
 * @return {Promise<object>} The updated author object.
 */
exports.updateAuthorService = async (id, data) => {
    const author = await Author.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { ...data }, { new: true });

    if (!author) {
        throw new NotFoundError('Author not found');
    }

    return author;

}

/**
 * Deletes an author by their ID, including all books associated with the author, and returns the deleted author.
 *
 * @param {string} id - The ID of the author to be deleted
 * @return {Promise<Author>} The deleted author
 */
exports.deleteAuthorService = async (id) => {
    const author = await Author.findById({ _id: new mongoose.Types.ObjectId(id) });

    if (!author) {
        throw new NotFoundError('Author not found');
    }
    
    await Book.deleteMany({ author: id });

    await Author.findByIdAndDelete(id);
    
    return author;
    
}