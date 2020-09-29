const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products");
const auth = require("../../middleware/auth");

router.post("/add", auth, productController.create);

router.get("/get", productController.get);

router.get("/get-category-products", productController.getCategoryProducts);

router.put("/update-product", auth, productController.update);

router.delete("/delete-product", auth, productController.delete);

module.exports = router;
