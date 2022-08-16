const express = require('express');

const router = express.Router();
// require('express-async-errors');
const rescue = require('../utils/rescue');

const salesController = require('../controllers/salesController');
const validation = require('../middlewares/validationSale');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post(
  '/',
  rescue(validation.validationSale),
  rescue(salesController.newSale),
);
router.delete('/:id', salesController.remove);

module.exports = router; 
