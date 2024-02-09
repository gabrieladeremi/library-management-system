const express = require('express');

const { create, list, view, update, deleteAuthor } = require('../controllers/author');

const { validateSchema } = require('../Validation/genericValidation');

const { authorSchema } = require('../Validation/authorValidation');

const { verifyAdminToken } = require('../middleware/index');

const router = express.Router();

router.post('/create', validateSchema(authorSchema), verifyAdminToken, create);

router.get('/list', verifyAdminToken, list);

router.get('/:id', verifyAdminToken, view);

router.put('/:id', verifyAdminToken, update);

router.delete('/:id', verifyAdminToken, deleteAuthor);


module.exports = router;