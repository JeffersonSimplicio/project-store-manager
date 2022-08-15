const express = require('express');

const router = express.Router();
// require('express-async-errors');
const rescue = require('../utils/rescue');

const productsController = require('../controllers/productsController');
const validation = require('../middlewares/validationNewProduct');
 
router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.getById));
router.post(
  '/',
  rescue(validation.validationNewProduct),
  rescue(productsController.addProduct),
);

module.exports = router; 