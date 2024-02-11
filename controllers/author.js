const { BadRequestError } = require("../response/responseMessage");
const AppSuccess = require("../response/responseProcessor");

const {
    createAuthorService,
    listAuthorService,
    viewAuthorService, 
    updateAuthorService,
    deleteAuthorService
} = require("../services/author");

const create = async (req, res, next) => {
    try {
        const { fullName, dateOfBirth, nationality, biography } = req.body;

        if (!fullName ) {
            throw new BadRequestError('Your details are Incomplete');
        }
        
        const newAuthor = await createAuthorService(fullName, dateOfBirth, nationality, biography);

        return new AppSuccess(res, newAuthor).CREATEDSUCCESSFULLY('New Author');

    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const authors = await listAuthorService(req.query);
        return new AppSuccess(res, authors).FETCHEDSUCCESSFULLY();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const view = async (req, res, next) => {
    try {
        const authorId = req.params.id;
        const author = await viewAuthorService(authorId);
        return new AppSuccess(res, author).FETCHEDSUCCESSFULLY();
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const authorId = req.params.id;
        const author = await updateAuthorService(authorId, req.body);
        return new AppSuccess(res, author).UPDATEDSUCCESSFULLY('Author');
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const authorId = req.params.id;
        const author = await deleteAuthorService(authorId);
        return new AppSuccess(res, author).DELETEDSUCCESSFULLY('Author');
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
}

module.exports = { create, list, view, update, deleteAuthor };