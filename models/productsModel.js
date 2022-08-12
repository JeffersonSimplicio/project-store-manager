const connection = require('./connection');

async function getAll() {
  const [products] = await connection.execute(
    'SELECT id, name FROM products ORDER BY id asc;',
  );
  return products;
}

async function getById(id) {
  const [products] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?;', [id],
  );
  return products;
}

module.exports = {
  getAll,
  getById,
};