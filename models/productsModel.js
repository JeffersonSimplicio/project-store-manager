const connection = require('./connection');

async function getAll() {
  const [products] = await connection.execute(
    'SELECT id, name FROM products ORDER BY id asc',
  );
  return products;
}

// getAll().then((teste) => console.log('models: ', teste));

module.exports = {
  getAll,
};