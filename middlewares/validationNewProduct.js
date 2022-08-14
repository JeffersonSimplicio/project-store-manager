const { validator, schemaNewProduct } = require('../utils/schema');

function validationNewProduct(req, res, next) {
  const newProduct = req.body;
  const result = validator(schemaNewProduct, newProduct);
  console.log('Tem isso em result', result);
  if (result.message) {
    if (result.message.length === 18) {
      return res.status(400).json(result); // menor
    }
    return res.status(422).json(result); // maior
  }
  next();
}

module.exports = { validationNewProduct };
