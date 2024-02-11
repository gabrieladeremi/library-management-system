const express = require('express');

const { create, list, view, update, deleteAuthor } = require('../controllers/author');

const { validateSchema } = require('../Validation/genericValidation');

const { authorSchema } = require('../Validation/authorValidation');

const { verifyAdminToken } = require('../middleware/index');

const router = express.Router();

/**
 * @openapi
 * /api/author/create:
 *   post:
 *     tags:
 *       - Add Author
 *     summary: Add a new author
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAuthorInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateAuthorResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.post('/create', validateSchema(authorSchema), verifyAdminToken, create);

/**
 * @openapi
 * /api/author/list:
 *   get:
 *     tags:
 *       - List Authors
 *     summary: List all authors
 *     parameters:
 *       - name: page
 *         in: query
 *         type: number
 *         description: Page number
 *       - name: limit
 *         in: query
 *         type: number
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authors'
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
*/
router.get('/list', list);

/**
 * @openapi
 * /api/author/{id}:
 *   get:
 *     tags:
 *       - View Authors
 *     summary: View an author
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the author
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
*/
router.get('/:id', view);

/**
 * @openapi
 * /api/author/{id}:
 *   put:
 *     tags:
 *       - Update Author
 *     summary: Update an existing author
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the author
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAuthorInput'
 *     responses:
 *       200:
 *         description: Okay
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateAuthorResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.put('/:id', verifyAdminToken, update);

/**
 * @openapi
 * /api/author/{id}:
 *   delete:
 *     tags:
 *       - Delete Author
 *     summary: Delete an existing author
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the author to be deleted
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
router.delete('/:id', verifyAdminToken, deleteAuthor);


module.exports = router;