const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model("category", CategorySchema);
