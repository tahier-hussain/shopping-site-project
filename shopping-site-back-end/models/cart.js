const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CartSchema = new Schema({
  product: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  product_title: {
    type: String
  },
  product_description: {
    type: String
  },
  product_image: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
