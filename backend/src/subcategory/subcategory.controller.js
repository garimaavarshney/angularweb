const { check, validationResult } = require('express-validator');
const subcategoryModel = require('./subcategory.model');
const categoryModel = require('../category/category.model');

let subcategoryController = {};

subcategoryController.create = async (req, res) => {

  await check('category', 'Category cannot be blank').run(req);
  await check('name', 'Name cannot be blank').isLength({ min: 1 }).run(req);
  await check('slug', 'Slug cannot be blank').isLength({ min: 1 }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(202).send({
      error: errors.array(),
      code: 404
    });
    return;
  }

  try {
    const categoryData = await categoryModel.find(
      { _id: req.body.category });
    if (categoryData && categoryData.length > 0) {
      const subcategoryDoc = new subcategoryModel({
        category: categoryData[0]._id,
        name: req.body.name,
        slug: req.body.slug
      });
      await subcategoryDoc.save();
      res.status(202).send({
        data: subcategoryDoc,
        message: 'Successfully Added!',
        code: 202
      });
    } else {
      res.status(202).send({
        message: 'No such category found.',
        code: 404
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      code: 500
    });
  }

};

subcategoryController.fetchByCategory = async (req, res) => {
  try {
    const subcategoryData = await subcategoryModel.find(
      { category: req.body.category },
      { _id: 1, category: 1, name: 1, slug: 1, status: 1 })
      .sort({ createdAt: -1 })
      .skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0);
    if (subcategoryData && subcategoryData.length > 0) {
      res.status(202).send({
        data: subcategoryData,
        code: 202
      });
    } else {
      res.status(202).send({
        message: 'No sub category data found.',
        code: 404
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error,
      code: 500
    });
  }
};

module.exports = subcategoryController;
