const joi = require('joi');

const schemaNewProduct = joi.object().keys({
  name: joi.string().min(5).required(),
});

const schemaNewSale = joi.array().items(
  joi.object().keys({
    productId: joi.number().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: joi.number().min(1).required().messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
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