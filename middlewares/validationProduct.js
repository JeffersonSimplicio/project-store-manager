const { validator, schemaProduct } = require('../utils/schema');

function validationProduct(req, res, next) {
  const newProduct = req.body;
  const result = validator(schemaProduct, newProduct);
  if (result.message) {
    if (result.message.length === 18) {
      return res.status(400).json(result);
    }
    return res.status(422).json(result);
  }
  next();
}

module.exports = { validationProduct };
