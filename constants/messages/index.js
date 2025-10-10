const brandMessages = require('./brandMessages');
const categoryMessages = require('./categoryMessages');
const subCategoryMessages = require('./subCategoryMessages');
const productMessages = require('./productMessages');
const errorsMessages = require('./errorMessages');
const validationMessages = require('./validationMessages');
const sequelizeMessages = require('./sequelizeMessages');

const messages = {
  brand: brandMessages,
  category: categoryMessages,
  subCategory: subCategoryMessages,
  product: productMessages,
  errors: errorsMessages,
  validation: validationMessages,
  sequelize: sequelizeMessages,
};

module.exports = messages;
