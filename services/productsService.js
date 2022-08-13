const productsModel = require('../models/productsModel');

async function getAll() {
  const products = await productsModel.getAll();
  return products;
}

async function getById(id) {
  const products = await productsModel.getById(id);
  if (products.length === 0) {
    return { message: 'Product not found' };
  }
  return products[0];
}

async function addProduct(nameProduct) {
  const products = await productsModel.addProduct(nameProduct);
  return products;
}

module.exports = {
  getAll,
  getById,
  addProduct,
}; 