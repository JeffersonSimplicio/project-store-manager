const productsService = require('../services/productsService');

async function getAll(_req, res) {
  const { code, data } = await productsService.getAll();
  res.status(code).json(data);
}

async function getById(req, res) {
  const { id } = req.params;
  const { code, data, message } = await productsService.getById(id);
  if (message) {
    return res.status(code).json(message);
  }
  res.status(code).json(data);
}

module.exports = {
  getAll,
  getById,
};