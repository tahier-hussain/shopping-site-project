const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductOrdersSchema = new Schema({
  product: {
    type: String,
    required: true
  },
  product_name: {
    type: String
  },
  product_description: {
    type: String
  },
  product_image: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  no_of_items: {
    type: String,
    default: "1"
  },
  user_name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProductOrder = mongoose.model("product-order", ProductOrdersSchema);
