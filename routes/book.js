const express = require('express');

const { create, list, view, update, deleteBook } = require('../controllers/book');

const { validateSchema } = require('../Validation/genericValidation');

const { bookSchema } = require('../Validation/bookValidation');

const { verifyAdminToken } = require('../middleware/index');

const router = express.Router();

/**
 * @openapi
 * /api/book/create:
 *   post:
 *     tags:
 *       - Add Book
 *     summary: Add a new book
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBookResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.post('/create', validateSchema(bookSchema), verifyAdminToken, create);

/**
 * @openapi
 * /api/book/list:
 *   get:
 *     tags:
 *       - List Books
 *     summary: List all books
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
*/
router.get('/list', list);

/**
 * @openapi
 * /api/book/{id}:
 *   get:
 *     tags:
 *       - View Book
 *     summary: View a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
*/
router.get('/:id', view);

/**
 * @openapi
 * /api/book/{id}:
 *   post:
 *     tags:
 *       - Update Book
 *     summary: Update a book
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBookResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.put('/:id', verifyAdminToken, update);

/**
 * @openapi
 * /api/book/{id}:
 *   delete:
 *     tags:
 *       - Delete Book
 *     summary: Delete an existing book
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the book to be deleted
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     responses:
 *       200:
 *         description: Okay
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteAuthor'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.delete('/:id', verifyAdminToken, deleteBook);


module.exports = router;