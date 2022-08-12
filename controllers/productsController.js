const productsService = require('../services/productsService');

async function getAll(_req, res) {
  const products = await productsService.getAll();
  // return { code: 200, data: products };
  res.status(200).json(products);
}

// getAll().then((teste) => console.log('controller: ', teste));

module.exports = {
  getAll,
};