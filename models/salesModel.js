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
