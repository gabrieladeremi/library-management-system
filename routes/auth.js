const express = require('express');

const register = require('../controllers/adminRegistration');

const borrowerAccount = require('../controllers/createAccount');

const login = require('../controllers/login');

const { validateSchema } = require('../Validation/genericValidation');

const { adminSchema, loginSchema, borrowerSchema } = require('../Validation/fieldValidation');


const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Admin Registration
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdminInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateAdminResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.post('/register', validateSchema(adminSchema), register);

/**
 * @openapi
 * /api/auth/create-account:
 *   post:
 *     tags:
 *       - Borrower Registration
 *     summary: Register a new book borrower
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBorrowerInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBorrowerResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.post('/create-account', validateSchema(borrowerSchema), borrowerAccount);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Login for either admin or borrower
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description:  Bad Request
 *       409:
 *         description: Conflict
 * 
 */
router.post('/login', validateSchema(loginSchema), login);

module.exports = router;