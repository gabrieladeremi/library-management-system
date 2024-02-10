const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAuthorInput:
 *       type: object
 *       required:
 *         - fullName
 *         - dateOfBirth
 *         - nationality
 *         - biography
 *       properties:
 *         fullName:
 *           type: string
 *           default: John Doe
 *         dateOfBirth:
 *           type: string
 *           default: 1990-01-01
 *         nationality:
 *           type: string
 *           default: American
 *         biography:
 *           type: string
 *           default: Lorem ipsum
 *     CreateAuthorResponse:
 *       type: object
 *       properties:
 *         status:
 *           value: true
 *         message:
 *           value: New Author has been created successfully
 *         error:
 *           value: null
 *         data:
 *           value: object
 *     Authors:
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
 *                 fullName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                 nationality:
 *                   type: string
 *                 biography:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 __v:
 *                   type: number
 *           
 *     Author:
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
 *              fullName:
 *                 type: string
 *              dateOfBirth:
 *                 type: string
 *              nationality:
 *                 type: string
 *              biography:
 *                 type: string
 *              createdAt:
 *                 type: string
 *              updatedAt:
 *                 type: string
 *              __v:
 *                 type: number         
 *     DeleteAuthor:
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
 *           value: Author has been deleted successfully
 *         error:
 *           type: string
 *           value: null
 *         data:
 *           type: object
 *           properties:
 *              _id:
 *                 type: string
 *              fullName:
 *                 type: string
 *              dateOfBirth:
 *                 type: string
 *              nationality:
 *                 type: string
 *              biography:
 *                 type: string
 *              createdAt:
 *                 type: string
 *              updatedAt:
 *                 type: string
 *              __v:
 *                 type: number         
 */
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