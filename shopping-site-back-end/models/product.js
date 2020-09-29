const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  product_title: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  filename: {
    type: String
  },
  created_by: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
