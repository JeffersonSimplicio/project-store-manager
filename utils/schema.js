const joi = require('joi');

const schemaNewProduct = joi.object().keys({
  name: joi.string().min(5).required(),
});

const schemaNewSale = joi.array().items(
  joi.object().keys({
    productId: joi.number().required(),
    quantity: joi.number().min(1).required(),
  }),
);

function validator(schema, body) {
  const negocio = schema.validate(body);
  if (negocio.error) {
    const { message } = negocio.error.details[0];
    return { message };
  }
  const data = negocio.value;
  return { data };
}

module.exports = { validator, schemaNewProduct, schemaNewSale };