const constants = require('../config/constants');
const category = require('../src/category/category.routes');
const subcategory = require('../src/subcategory/subcategory.routes');

const apiString = `/api/${constants.API_VERSION}`;

module.exports = function (app) {
  app.use(apiString + '/category', category);
  app.use(apiString + '/subcategory', subcategory);
};
