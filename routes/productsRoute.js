const express = require('express');

const router = express.Router();
const rescue = require('../utils/rescue');
const productsController = require('../controllers/productsController');
 
router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.getById));
router.post('/', rescue(productsController.addProduct));

module.exports = router; 