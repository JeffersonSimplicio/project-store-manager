const connection = require('./connection');

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

async function getById(id) {
  const [products] = await connection.execute(
    `SELECT
      s.date AS 'date',
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
      StoreManager.sales_products AS sp
    INNER JOIN
      StoreManager.sales AS s
    ON
      sp.sale_id = s.id
    WHERE
      sp.sale_id = ?
    ORDER BY
      productId ASC ;`,
    [id],
  );
  return products;
}

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

async function remove(id) {
  await connection.execute(
    `DELETE FROM
      StoreManager.sales_products
    WHERE
      sale_id = ?;`,
    [id],
  );
  await connection.execute(
    `DELETE FROM
      StoreManager.sales
    WHERE
      id = ?;`,
    [id],
  );
}

async function update(id, { productId, quantity }) {
  await connection.execute(
    `UPDATE
      StoreManager.sales_products
    SET
      quantity = ?
    WHERE
      sale_id = ? AND product_id = ?;`,
    [quantity, id, productId],
  );
}

module.exports = {
  getAll,
  getById,
  addSale,
  linkBuyProducts,
  remove,
  update,
};
