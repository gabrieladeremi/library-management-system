const express = require('express');

const { create, list, view, update, deleteBorrowedRecord } = require('../controllers/borrower');

const { verifyToken, verifyAdminToken } = require('../middleware/index');

const router = express.Router();

/**
 * @openapi
 * /api/borrower/create:
 *   post:
 *     tags:
 *       - Create a borrow
 *     summary: Create a new book borrow
 *     security:
 *       - bearerAuth: [] # Bearer token is required for this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookBorrowInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBookBorrowResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.post('/create', verifyToken, create);

/**
 * @openapi
 * /api/borrower/list:
 *   get:
 *     tags:
 *       - List of Books Borrowers
 *     summary: List all books borrowed
 *     security:
 *       - bearerAuth: [] # Bearer token is required for this endpoint
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrowers'
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
*/
router.get('/list', verifyAdminToken,list);

/**
 * @openapi
 * /api/borrower/{id}:
 *   get:
 *     tags:
 *       - View Borrower
 *     summary: View a borrower
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the borrower
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrower'
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
*/
router.get('/:id', verifyAdminToken, view);

/**
 * @openapi
 * /api/borrower/{id}:
 *   put:
 *     tags:
 *       - Update Borrow
 *     summary: Update an exiting book borrow
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the borrow
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookBorrowInput'
 *     responses:
 *       200:
 *         description: Okay
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBookBorrowResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.put('/:id', verifyAdminToken, update);

/**
 * @openapi
 * /api/borrower/{id}:
 *   delete:
 *     tags:
 *       - Delete Borrow
 *     summary: Delete an borrow method
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the borrower to be deleted
 *     security:
 *       - bearerAuth: [] # Bearer token is required
 *     responses:
 *       200:
 *         description: Okay
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteBorrower'
 *       400:
 *         description:  Bad Request
 *       404:
 *         description: Not Found
 *       409:
 *         description: Conflict
 * 
 */
router.delete('/:id', verifyAdminToken, deleteBorrowedRecord);


module.exports = router;