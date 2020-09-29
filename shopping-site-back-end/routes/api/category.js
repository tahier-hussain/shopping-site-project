const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category");
const auth = require("../../middleware/auth");

router.post("/add", auth, categoryController.create);

router.get("/get", categoryController.get);

router.put("/update-category", auth, categoryController.update);

router.delete("/delete-category", auth, categoryController.delete);

module.exports = router;
