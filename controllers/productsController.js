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

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const product = await productsService.update(id, name);

  if (product.message) {
    return res.status(404).json(product);
  }
   
  res.status(200).json(product);
}

async function remove(req, res) {
  const { id } = req.params;
  const product = await productsService.remove(id);
  if (product) {
    return res.status(404).json(product);
  }
  res.status(204).end();
}

async function getByName(req, res) {
  const { q: search } = req.query;
  console.log(search);
  const products = await productsService.getByName(search);
  return res.status(200).json(products);
}

module.exports = {
  getAll,
  getById,
  addProduct,
  update,
  remove,
  getByName,
};