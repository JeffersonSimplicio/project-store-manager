const connection = require('./connection');

async function getAll() {
  const [products] = await connection.execute(
    'SELECT id, name FROM products ORDER BY id asc;',
  );
  return products;
}

async function getById(id) {
  const [products] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return products;
}

async function addProduct(nameProduct) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [nameProduct],
  );
  return { id: insertId, name: nameProduct };
}

module.exports = {
  getAll,
  getById,
  addProduct,
};