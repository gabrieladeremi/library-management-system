const express = require('express');

const { create, list, view, update, deleteBook } = require('../controllers/book');

const { validateSchema } = require('../Validation/genericValidation');

const { bookSchema } = require('../Validation/bookValidation');

const { verifyAdminToken } = require('../middleware/index');

const router = express.Router();

router.post('/create', validateSchema(bookSchema), verifyAdminToken, create);

router.get('/list', list);

router.get('/:id', view);

router.put('/:id', verifyAdminToken, update);

router.delete('/:id', verifyAdminToken, deleteBook);


module.exports = router;