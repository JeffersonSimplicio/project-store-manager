const connection = require('./connection');

async function addSale() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ();',
  );
  return insertId;
}

async function linkBuyProducts(saleId, { productId, quantity }) {
  await connection.execute(
    `INSERT INTO
      StoreManager.sales_products(sale_id, product_id, quantity)
    VALUES (?, ?, ?);`,
    [saleId, productId, quantity],
  );
}

module.exports = {
  addSale,
  linkBuyProducts,
};

// {
//   "id": 3,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity":1
//     },
//     {
//       "productId": 2,
//       "quantity":5
//     }
//   ]
// }