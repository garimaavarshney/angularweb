const { check, validationResult } = require('express-validator');
const categoryModel = require('./category.model');

let categoryController = {};

categoryController.create = async (req, res) => {

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
    const categoryDoc = new categoryModel(req.body);
    await categoryDoc.save();
    res.status(202).send({
      data: categoryDoc,
      message: 'Successfully Updated!',
      code: 202
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      code: 500
    });
  }

};

categoryController.fetchAll = async (req, res) => {
  try {
    const categoryData = await categoryModel.find({},
      { _id: 1, name: 1, slug: 1, status: 1 })
      .sort({ createdAt: -1 })
      .skip(req.body.page > 0 ? ((req.body.page - 1) * req.body.limit) : 0);
    if (categoryData && categoryData.length > 0) {
      res.status(202).send({
        data: categoryData,
        code: 202
      });
    } else {
      res.status(202).send({
        message: 'No category data found.',
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

module.exports = categoryController;
