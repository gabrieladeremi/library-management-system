const { BadRequestError } = require("../response/responseMessage");
const AppSuccess = require("../response/responseProcessor");

const {
    createBorrowerService,
    listBorrowerService,
    viewBorrowerService,
    updateBorrowerService,
    deleteBorrowerService
} = require('../services/borrower');
const create = async (req, res, next) => {
    try {
        const { book } = req.body;

        if (!book) {
            throw new BadRequestError('Missing required fields');
        }

        const user = req.user;

        const newBorrow = await createBorrowerService(user, book);

        return new AppSuccess(res, newBorrow).CREATEDSUCCESSFULLY('Book Borrowed');

    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const borrowedBooks = await listBorrowerService(req.query);
        return new AppSuccess(res, borrowedBooks).FETCHEDSUCCESSFULLY();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const view = async (req, res, next) => {
    try {
        const id = req.params.id;
        const borrowedBook = await viewBorrowerService(id);
        return new AppSuccess(res, borrowedBook).FETCHEDSUCCESSFULLY();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedBorrower = await updateBorrowerService(id, req.body.book);
        return new AppSuccess(res, updatedBorrower).UPDATEDSUCCESSFULLY('Borrower');
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const deleteBorrowedRecord = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBorrower = await deleteBorrowerService(id);
        return new AppSuccess(res, deletedBorrower).DELETEDSUCCESSFULLY('Borrower');
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

module.exports = { create, list, view, update, deleteBorrowedRecord };