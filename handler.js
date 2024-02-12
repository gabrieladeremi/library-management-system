const Admin = require('./model/admin');
const Borrower = require('./model/borrower');
const db = require('./connection/mongoDb');
const { verifyPassword } = require('./security/hash');
const { createLoginToken } = require('./utils/generateLoginToken');
const Author = require('./model/author');
const Book = require('./model/books');
const mongoose = require('mongoose');
/**
 * Helper function
 * @param {*} statusCode
 * @param {*} message
 * @returns
 */
const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    error: message || 'An Error occurred.',
  }),
});
/**
 * 
 * @param {*} error Error message
 */
const returnError = (error) => {
  console.log(error);
  if (error.name) {
    const message = `Invalid ${error.path}: ${error.value}`;
    callback(null, createErrorResponse(400, `Error:: ${message}`));
  } else {
    callback(
      null,
      createErrorResponse(error.statusCode || 500, `Error:: ${error.name}`)
    );
  }
};

module.exports.register = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isEmpty(event.body)){
    return callback(null, createErrorResponse(400, 'Missing details'))
  };

  const { fullName, email, password, confirmPassword } = JSON.parse(event.body)

  const newAdminObj = new Admin({ fullName, email, password })

  try {
    await db();

    const admin = await Admin.create(newAdminObj);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(admin),
    })
  } catch (error) {
    returnError(error);
  }
};

module.exports.createBorrower = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isEmpty(event.body)){
    return callback(null, createErrorResponse(400, 'Missing details'))
  };

  const { fullName, email, address, phoneNumber, password } = JSON.parse(event.body)

  const newBorrower = new Borrower({ fullName, email, address, phoneNumber, password })

  try {
    await db();

    const borrower = await Borrower.create(newBorrower);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(borrower),
    })
  } catch (error) {
    returnError(error);
  }
};

module.exports.login = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, 'Missing details'))
  };

  const { email, password, type } = JSON.parse(event.body) 

  try {
    await db();

    const user = type === 'admin' ?
      await Admin.findOne({ email: email.toLowerCase() }) :
      await Borrower.findOne({ email: email.toLowerCase() }); 
    
    if (!user || !(await verifyPassword(password, user.password))) {
      returnError('Incorrect password');
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: type === 'admin' ? 'admin' : 'borrower',
      fullName: user.fullName,
    };

    const token = await createLoginToken(payload);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(token),
    })
  } catch (error) {
    returnError(error);
  }
};

module.exports.createAuthor = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, 'Missing details'))
  };

  const { fullName, dateOfBirth, nationality, biography } = JSON.parse(event.body)

  const newAuthor = new Author({ fullName, dateOfBirth, nationality, biography })

  try {
    await db();

    const author = await Author.create(newAuthor);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(author),
    })
  } catch (error) {
    returnError(error);
  }
};

module.exports.getAuthors = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await db();
    const page = +event.queryParameters.page || 1;
    const limit = +event.queryParameters || 10;
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

    const response = {
      authors,
      pages,
      totalAuthors,
    };

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.getAuthor = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
 
  try {
    await db();
    const author = await Author.findById(id);

    if (!author) {
      callback(null, createErrorResponse(404, `No Author found with id: ${id}`));
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(author),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.updateAuthor = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);

  if (isEmpty(data)) {
    return callback(null, createErrorResponse(400, 'Missing details'));
  }
  const { fullName, dateOfBirth, nationality, biography } = data;

  try {
    await db();
    
    const author = await Author.findById(event.pathParameters.id);

    if (author) {
      author.fullName = fullName || author.fullName;
      author.dateOfBirth = dateOfBirth || author.dateOfBirth;
      author.nationality = nationality || author.nationality;
      author.biography = biography || author.biography;
    }

    const updatedAuthor = await author.save();

    callback(null, {
      statusCode: 204,
      body: JSON.stringify(updatedAuthor),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.deleteAuthor = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  if (!id) {
    callback(null, createErrorResponse(400, 'Missing detail.'));
    return;
  }
  try {
    await db();
    const author = await Author.findByIdAndRemove(id);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Removed note with id: ${author._id}`,
        note,
      }),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.createBook = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, 'Missing details'))
  };

  const {
    authorId,
    title,
    description,
    isbn,
    genre,
    publishedDate,
    publisher,
    copies } = JSON.parse(event.body)

  const newBook = new Book({
    authorId,
    title,
    description,
    isbn,
    genre,
    publishedDate,
    publisher,
    copies })

  try {
    await db();

    const book = await Book.create(newBook);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(book),
    })
  } catch (error) {
    returnError(error);
  }
};

module.exports.getBooks = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await db();

    const page = +event.queryParameters.page || 1;
    const limit = +event.queryParameters || 10;
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

    const response = {
      books,
      pages,
      totalBooks,
    };

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.getBook = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;

  try {
    await db();
    const book = await Book.findById(id);

    if (!book) {
      callback(null, createErrorResponse(404, `No Book found with id: ${id}`));
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(book),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.updateBook = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);

  if (isEmpty(data)) {
    return callback(null, createErrorResponse(400, 'Missing details'));
  }
  const {
    title,
    description,
    isbn,
    genre,
    publishedDate,
    publisher,
    copies
  } = data;

  try {
    await db();

    const book = await Book.findById(event.pathParameters.id);

    if (book) {
      book.title = title || book.title;
      book.description = description || book.description;
      book.isbn = isbn || book.isbn;
      book.genre = genre || book.genre;
      book.publishedAt = publishedAt || book.publishedAt;
      book.publisher = publisher || book.publisher;
      book.copies = copies || book.copies;
    }

    const updatedBook = await book.save();

    callback(null, {
      statusCode: 204,
      body: JSON.stringify(updatedBook),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.deleteBook = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  if (!id) {
    callback(null, createErrorResponse(400, 'Missing detail.'));
    return;
  }
  try {
    await db();
    const book = await Book.findByIdAndRemove(id);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Removed book with id: ${book._id}`,
        note,
      }),
    });
  } catch (error) {
    returnError(error);
  }
};
module.exports.createBorrower = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, 'Missing details'))
  };

  try {
    await db();

    const bookIds = [];

    const { user, books } = JSON.parse(event.body)

    const borrower = await Borrower.findOne({ email: user.email });

    if (!borrower) {
      returnError('User not found');
    }

    if (borrower.books.length >= 3) {
      returnError('User has already borrowed 3 books');
    }

    const existingBookIds = borrower.books.map(book => book.toString());


    for (const book of books) {
      const retrievedBook = await Book.findById(book.id);

      if (!retrievedBook) {
        returnError('Book not found');
      }

      if (retrievedBook.copies < book.copy) {
        returnError('Book copies unavailable');
      }

      if (book.copy > 1) {
        returnError('You cannot borrow more than 1 copy of a book');

      }

      const bookId = retrievedBook._id.toString();

      if (existingBookIds.includes(bookId)) {
        returnError('Book already borrowed');
      }

      bookIds.push(retrievedBook._id);

      retrievedBook.borrowedCopyCount += book.copy;

      await retrievedBook.save();
    }

    borrower.books.push(...bookIds);

    const newBorrow = await borrower.save();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(newBorrow),
    })
  } catch (error) {
    returnError(error);
  }
};

module.exports.getBorrowers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await db();

    const page = +event.queryParameters.page || 1;
    const limit = +event.queryParameters || 10;
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

    const response = {
      borrowedBooks,
      pages,
      totalBorrowedBooks,
    };

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.getBorrower = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;

  try {
    await db();
    const borrower = await Borrower.findById(id);

    if (!borrower) {
      callback(null, createErrorResponse(404, `No Book found with id: ${id}`));
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(borrower),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.updateBorrower = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  const data = JSON.parse(event.body);

  if (isEmpty(data)) {
    return callback(null, createErrorResponse(400, 'Missing details'));
  }
  const { bookIdReturned } = data;

  try {
    await db();

    const borrower = await Borrower.findById(id);

    if (!borrower) {
      returnError('Borrower not found');
    }

    const bookIds = bookIdReturned.map(id => new mongoose.Types.ObjectId(id));

    borrower.books = borrower.books.filter(bookId => !bookIdReturned.includes(bookId.toString()))

    await Book.updateMany({ _id: { $in: bookIds } }, { $inc: { borrowedCopyCount: -1 } });

    const updateBorrower = await borrower.save();

    callback(null, {
      statusCode: 204,
      body: JSON.stringify(updateBorrower),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.deleteBorrower = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;
  if (!id) {
    callback(null, createErrorResponse(400, 'Missing detail.'));
    return;
  }
  try {
    await db();
    const borrowerRecord = await Borrower.findById({ _id: new mongoose.Types.ObjectId(id) });

    if (!borrowerRecord) {
      returnError('Borrower not found');
    }

    if (borrowerRecord.books.length > 0) {
      returnError('Pending books to return');
    }

   const borrower = await Borrower.findByIdAndRemove(id);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Removed book with id: ${borrower._id}`,
        note,
      }),
    });
  } catch (error) {
    returnError(error);
  }
};