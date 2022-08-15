const express = require('express');

const router = express.Router();
// require('express-async-errors');
const rescue = require('../utils/rescue');

const productsController = require('../controllers/productsController');
const validation = require('../middlewares/validationProduct');
 
router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.getById));
router.post(
  '/',
  rescue(validation.validationProduct),
  rescue(productsController.addProduct),
);
router.put(
  '/:id',
  rescue(validation.validationProduct),
  rescue(productsController.update),
);

module.exports = router; 