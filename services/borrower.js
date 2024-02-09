const Book = require("../model/books");
const Borrower = require("../model/borrower");
const mongoose = require("mongoose");

const { NotFoundError, BadRequestError } = require("../response/responseMessage");

/**
 * Creates a borrower service by allowing a user to borrow books.
 *
 * @param {Object} user - the user object
 * @param {Array} books - an array of books to be borrowed
 * @return {Promise} a Promise that resolves to the updated borrower object after saving
 */
exports.createBorrowerService = async (user, books) => {

    const bookIds = [];

    const borrower = await Borrower.findOne({ email: user.email });

    if (!borrower) {
        throw new NotFoundError('User not found');
    }

    if (borrower.books.length >= 3) {
        throw new BadRequestError('User has already borrowed 3 books');
    }

    const existingBookIds = borrower.books.map(book => book.toString());


    for (const book of books) {
        const retrievedBook = await Book.findById(book.id);

        if (!retrievedBook) {
            throw new NotFoundError('Book not found');
        }

        if (retrievedBook.copies < book.copy) {
            throw new BadRequestError('Book copies unavailable');
        }

        if (book.copy > 1) {
            throw new BadRequestError('You cannot borrow more than 1 copy of a book');

        }

        const bookId = retrievedBook._id.toString();

        if (existingBookIds.includes(bookId)) {
            throw new BadRequestError('Book already borrowed');
        }

        bookIds.push(retrievedBook._id);

        retrievedBook.borrowedCopyCount += book.copy;

        await retrievedBook.save();
    }

    borrower.books.push(...bookIds);

    return await borrower.save();
}

/**
 * Retrieves a list of borrowed books and their information based on the provided query parameters.
 *
 * @param {Object} query - The query parameters for pagination and filtering.
 * @return {Object} An object containing the list of borrowed books, total number of borrowed books, and total number of pages.
 */
exports.listBorrowerService = async (query) => {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const skip = (page - 1) * limit;

    const borrowedBooks = await Borrower.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: 'books.id',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            isbn: 1,
                            description: 1,
                            genre: 1,
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
        },
    ]);

    const totalBorrowedBooks = await Borrower.countDocuments();
    const pages = Math.ceil(totalBorrowedBooks / limit);

    return {
        borrowedBooks,
        pages,
        totalBorrowedBooks,
    };
}

/**
 * Retrieves the borrower information by their ID, including the books they have borrowed.
 *
 * @param {string} id - The ID of the borrower
 * @return {Promise<Borrower>} The retrieved borrower information
 */
exports.viewBorrowerService = async (id) => {
    const borrower = await Borrower.findById(id).populate('books');

    if (!borrower) {
        throw new NotFoundError('Author not found');
    }

    return borrower;
}

/**
 * Update borrower service to return books and update borrowed copy count.
 *
 * @param {string} id - The ID of the borrower
 * @param {Array<string>} bookIdReturned - Array of book IDs returned by the borrower
 * @return {Promise<Borrower>} The updated borrower object after saving
 */
exports.updateBorrowerService = async (id, bookIdReturned) => {
    const borrower = await Borrower.findById(id);

    if (!borrower) {
        throw new NotFoundError('Borrower not found');
    }

    const bookIds = bookIdReturned.map(id => new mongoose.Types.ObjectId(id));

    borrower.books = borrower.books.filter(bookId => !bookIdReturned.includes(bookId.toString()))
    
    await Book.updateMany({ _id: { $in: bookIds } }, { $inc: { borrowedCopyCount: -1 } });

    return await borrower.save();
    
}

/**
 * Deletes a borrower record by ID, if it exists and has no pending books to return.
 *
 * @param {string} id - The ID of the borrower record to delete
 * @return {Promise<object>} The deleted borrower record
 */
exports.deleteBorrowerService = async (id) => {
    const borrowerRecord = await Borrower.findById({ _id: new mongoose.Types.ObjectId(id) });

    if (!borrowerRecord) {
        throw new NotFoundError('Borrower not found');
    }

    if (borrowerRecord.books.length > 0) {
        throw new BadRequestError('Pending books to return');
    }

    await Borrower.findByIdAndDelete(id);

    return borrowerRecord;

}