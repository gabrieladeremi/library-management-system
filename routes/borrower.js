const express = require('express');

const { create, list, view, update, deleteBorrowedRecord } = require('../controllers/borrower');

const { verifyToken, verifyAdminToken } = require('../middleware/index');

const router = express.Router();

router.post('/create', verifyToken, create);

router.get('/list', verifyAdminToken,list);

router.get('/:id', verifyAdminToken, view);

router.put('/:id', verifyAdminToken, update);

router.delete('/:id', verifyAdminToken, deleteBorrowedRecord);


module.exports = router;