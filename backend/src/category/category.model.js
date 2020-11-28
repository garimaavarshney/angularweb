const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
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

module.exports = mongoose.model('category', categorySchema);
