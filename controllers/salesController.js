const salesService = require('../services/salesService');

async function getAll(_req, res) {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
}

async function getById(req, res) {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (sale.message) {
    return res.status(404).json(sale);
  }
  res.status(200).json(sale);
}

async function newSale(req, res) {
  const shoppingList = req.body;
  const sales = await salesService.newSale(shoppingList);
  if (sales.message) {
    return res.status(404).json(sales);
  }
  res.status(201).json(sales);
}

async function remove(req, res) {
  const { id } = req.params;
  const product = await salesService.remove(id);
  if (product) {
    return res.status(404).json(product);
  }
  res.status(204).end();
}

async function update(req, res) {
  const { id } = req.params;
  const shoppingList = req.body;

  const product = await salesService.update(id, shoppingList);

  if (product.message) {
    return res.status(404).json(product);
  }

  res.status(200).json(product);
}

module.exports = {
  getAll,
  getById,
  newSale,
  remove,
  update,
};