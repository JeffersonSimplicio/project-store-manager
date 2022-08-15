const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

async function getAll() {
  const result = await salesModel.getAll();
  return result;
}

async function newSale(shoppingList) {
  const products = await Promise
    .all(shoppingList.map((sale) => productsModel.getById(sale.productId)));

  if (products.some((product) => product.length === 0)) {
    return { message: 'Product not found' };
  }

  const idSale = await salesModel.addSale();
  await Promise.all(
    shoppingList.map((sale) => salesModel.linkBuyProducts(idSale, sale)),
  );
  
  const result = {
    id: idSale,
    itemsSold: shoppingList,
  };
  return result;
}

module.exports = {
  getAll,
  newSale,
};
