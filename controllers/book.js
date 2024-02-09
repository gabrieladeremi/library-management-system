const { NotFoundError } = require("../response/responseMessage");
const AppSuccess = require("../response/responseProcessor");

const {
    createBookService,
    listBooksService,
    viewBookService,
    updateBookService,
    deleteBookService
} = require("../services/book");

const create = async (req, res, next) => {
    try {
        const { authorId, title, description, isbn, genre, publishedDate, publisher, copies } = req.body;
        
        if (!authorId ||!title || !isbn || !publishedDate || !copies) {
            throw new NotFoundError('Your details are Incomplete');
        }

        const newBook = await createBookService(authorId, title, description, isbn, genre, publishedDate, publisher, copies);

        return new AppSuccess(res, newBook).CREATEDSUCCESSFULLY('New Book');

    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const books = await listBooksService(req.query);
        return new AppSuccess(res, books).FETCHEDSUCCESSFULLY();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const view = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await viewBookService(bookId);
        return new AppSuccess(res, book).FETCHEDSUCCESSFULLY();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await updateBookService(bookId, req.body);
        return new AppSuccess(res, book).UPDATEDSUCCESSFULLY('Book');
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await deleteBookService(bookId);
        return new AppSuccess(res, book).DELETEDSUCCESSFULLY('Book');
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

module.exports = { create, list, view, update, deleteBook };