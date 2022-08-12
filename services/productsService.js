const productsModel = require('../models/productsModel');

async function getAll() {
  const products = await productsModel.getAll();
  return { code: 200, data: products };
}

async function getById(id) {
  const products = await productsModel.getById(id);
  if (products.length === 0) {
    return { code: 404, message: { message: 'Product not found' } };
  }
  return { code: 200, data: products[0] };
}

module.exports = {
  getAll,
  getById,
};