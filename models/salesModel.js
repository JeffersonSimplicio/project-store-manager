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

async function getAll() {
    const [products] = await connection.execute(
      `SELECT
        s.id AS saleId,
        s.date AS 'date',
        sp.product_id AS productId,
        sp.quantity AS quantity
      FROM
        StoreManager.sales_products AS sp
      INNER JOIN
        StoreManager.sales AS s
      ON
        sp.sale_id = s.id
      ORDER BY
        saleId ASC,
        productId ASC ;`,
    );
    return products;
}

// getAll().then((teste) => console.log(teste));

module.exports = {
  getAll,
  addSale,
  linkBuyProducts,
};
