const express = require('express');

const router = express.Router();

// require('express-async-errors');
const rescue = require('../utils/rescue');

const salesController = require('../controllers/salesController');

router.post('/', rescue(salesController.newSale));

module.exports = router; 
