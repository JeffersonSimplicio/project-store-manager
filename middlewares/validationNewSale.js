const { validator, schemaNewSale } = require('../utils/schema');

function validationNewSale(req, res, next) {
  const newProduct = req.body;
  const result = validator(schemaNewSale, newProduct);
  if (result.message) {
    if (result.message.includes('required')) {
      return res.status(400).json(result);
    }
    return res.status(422).json(result);
  }
  next();
}

module.exports = { validationNewSale };
