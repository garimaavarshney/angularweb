const express = require('express');
const router = express.Router();
const subcategoryController = require('./subcategory.controller');

router.post('/create', subcategoryController.create); // Create a new subcategory
router.post('/fetch', subcategoryController.fetchByCategory); // Fetch subcategory data by category id

module.exports = router;
