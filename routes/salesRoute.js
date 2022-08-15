const express = require('express');

const router = express.Router();
// require('express-async-errors');
const rescue = require('../utils/rescue');

const salesController = require('../controllers/salesController');
const validation = require('../middlewares/validationNewSale');

router.post('/',
  rescue(validation.validationNewSale),
  rescue(salesController.newSale));

router.get('/', salesController.getAll);
router.get('/:id');

module.exports = router; 
