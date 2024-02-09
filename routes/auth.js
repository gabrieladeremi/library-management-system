const express = require('express');

const register = require('../controllers/adminRegistration');

const borrowerAccount = require('../controllers/createAccount');

const login = require('../controllers/login');

const { validateSchema } = require('../Validation/genericValidation');

const { adminSchema, loginSchema, borrowerSchema } = require('../Validation/fieldValidation');


const router = express.Router();

router.post('/register', validateSchema(adminSchema), register);

router.post('/create-account', validateSchema(borrowerSchema), borrowerAccount);

router.post('/login', validateSchema(loginSchema), login);

module.exports = router;