const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subcategorySchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: String,
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('subcategory', subcategorySchema);
