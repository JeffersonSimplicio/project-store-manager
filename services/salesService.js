const salesModel = require('../models/salesModel');

async function newSale(shoppingList) {
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

// const teste = [
//   {
//     productId: 1,
//     quantity: 1,
//   },
//   {
//     productId: 2,
//     quantity: 5,
//   },
// ];
// newSale(teste).then((testeo) => console.log(testeo));

module.exports = {
  newSale,
};
