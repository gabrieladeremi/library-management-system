const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBookInput:
 *       type: object
 *       required:
 *         - authorId
 *         - title
 *         - description
 *         - isbn
 *         - genre
 *         - publishedDate
 *         - publisher
 *         - copies
 *       properties:
 *         authorId:
 *           type: string
 *           default: 12345
 *         title:
 *           type: string
 *           default: The Great Gatsby
 *         description:
 *           type: string
 *           default: Lorem Ipsum
 *         isbn:
 *           type: string
 *           default: 12345
 *         genre:
 *           type: string
 *           default: Fiction
 *         publishedDate:
 *           type: string
 *           default: 1925-04-10
 *         publisher:
 *           type: string
 *           default: Charles Scribner's Sons
 *         copies:
 *           type: number
 *           default: 5
 *     CreateBookResponse:
 *       type: object
 *       properties:
 *         status:
 *           value: true
 *         message:
 *           value: New Book has been created successfully
 *         error:
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *               _id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isbn:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *               publisher:
 *                 type: string
 *               copies:
 *                 type: number
 *               borrowedCopyCount:
 *                 type: number
 *               createdAt:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *               __v:
 *                 type: number
 *     Books:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - error
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           value: true
 *         message:
 *           type: string
 *           value: Fetched successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: array
 *           items:
 *              properties:
 *                 _id:
 *                   type: string
 *                 authorId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 isbn:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                 publisher:
 *                   type: string
 *                 copies:
 *                   type: number
 *                 borrowedCopyCount:
 *                   type: number
 *                 authorInfo:
 *                   type: object
 *                   properties:
 *                      _id:
 *                         type: string
 *                      fullName:
 *                         type: string
 *                      dateOfBirth:
 *                         type: string
 *                      nationality:
 *                         type: string
 *                      biography:
 *                         type: string 
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 __v:
 *                   type: number
 *           
 *     Book:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - error
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           value: true
 *         message:
 *           type: string
 *           value: Fetched successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *              _id:
 *                 type: string
 *              authorId:
 *                 type: object
 *                 properties:
 *                    _id:
 *                       type: string
 *                    fullName:
 *                       type: string
 *                    dateOfBirth:
 *                       type: string
 *                    nationality:
 *                       type: string
 *                    biography:
 *                       type: string
 *                    createdAt:
 *                       type: string
 *                    updatedAt:
 *                       type: string
 *                    __v:
 *                       type: number
 *              title:
 *                 type: string
 *              description:
 *                 type: string
 *              isbn:
 *                 type: string
 *              genre:
 *                 type: string
 *              publishedDate:
 *                 type: string
 *              publisher:
 *                 type: string
 *              copies:
 *                 type: number
 *              borrowedCopyCount:
 *                 type: number
 *              createdAt:
 *                 type: string
 *              updatedAt:
 *                 type: string
 *              __v:
 *                 type: number         
 *     DeleteBook:
 *       type: object
 *       required:
 *         - status
 *         - message
 *         - error
 *         - data
 *       properties:
 *         status:
 *           type: string
 *           value: true
 *         message:
 *           type: string
 *           value: Book has been deleted successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *               _id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isbn:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *               publisher:
 *                 type: string
 *               copies:
 *                 type: number
 *               borrowedCopyCount:
 *                 type: number
 *               createdAt:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *               __v:
 *                 type: number      
 */
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