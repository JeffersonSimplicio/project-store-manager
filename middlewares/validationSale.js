const { validator, schemaSale } = require('../utils/schema');

function validationSale(req, res, next) {
  const salesData = req.body;
  const result = validator(schemaSale, salesData);
  if (result.message) {
    if (result.message.includes('required')) {
      return res.status(400).json(result);
    }
    return res.status(422).json(result);
  }
  next();
}

module.exports = { validationSale };
