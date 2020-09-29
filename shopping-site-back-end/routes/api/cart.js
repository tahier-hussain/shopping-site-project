const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart");
const auth = require("../../middleware/auth");

router.post("/add", auth, cartController.create);

router.get("/get-user-cart", auth, cartController.getUserCart);

router.delete("/delete-cart-item", auth, cartController.deleteCartItem);

module.exports = router;
