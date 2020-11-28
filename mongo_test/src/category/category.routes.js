const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');

router.post('/create', categoryController.create); // Create a new category
router.post('/fetch', categoryController.fetchAll); // Fetch category data by id

module.exports = router;
