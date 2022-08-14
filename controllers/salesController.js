const salesService = require('../services/salesService');

async function newSale(req, res) {
  const shoppingList = req.body;
  const sales = await salesService.newSale(shoppingList);
  res.status(201).json(sales);
}

module.exports = {
  newSale,
};