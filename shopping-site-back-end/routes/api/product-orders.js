const express = require("express");
const router = express.Router();
const productOrderController = require("../../controllers/product-orders");
const auth = require("../../middleware/auth");

router.post("/add", auth, productOrderController.create);

router.get("/orders-to-be-delivered", productOrderController.ordersToBeDelivered);

router.get("/orders-delivered", productOrderController.ordersDelivered);

router.get("/orders-by-one-user", auth, productOrderController.ordersByOneUser);

router.post("/update-status", auth, productOrderController.updateStatus);

router.delete("/delete-order", auth, productOrderController.delete);

module.exports = router;
