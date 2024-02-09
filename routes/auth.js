const express = require('express');

const register = require('../controllers/adminRegistration');

const login = require('../controllers/login');

const { validateSchema } = require('../Validation/genericValidation');

const { adminSchema, loginSchema } = require('../Validation/fieldValidation');


const router = express.Router();

router.post('/register', validateSchema(adminSchema), register);

router.post('/login', validateSchema(loginSchema), login);

module.exports = router;