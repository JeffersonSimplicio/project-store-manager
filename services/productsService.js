const productsModel = require('../models/productsModel');

async function getAll() {
  const products = await productsModel.getAll();
  return products;
}

// getAll().then((teste) => console.log('services: ', teste));

module.exports = {
  getAll,
};