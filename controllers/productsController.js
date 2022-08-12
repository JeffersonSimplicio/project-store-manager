const productsService = require('../services/productsService');

async function getAll(_req, res) {
  const products = await productsService.getAll();
  res.status(200).json(products);
}

async function getById(req, res) {
  const { id } = req.params;
  const products = await productsService.getById(id);
  if (products.message) {
    return res.status(404).json(products);
  }
  res.status(200).json(products);
}

async function addProduct(req, res) {
  const { name } = req.body;
  const products = await productsService.addProduct(name);
  res.status(201).json(products);
}

module.exports = {
  getAll,
  getById,
  addProduct,
};