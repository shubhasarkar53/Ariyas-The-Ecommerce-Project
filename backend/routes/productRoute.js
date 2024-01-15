const express = require("express");
const { getAllProducts, createNewProducts } = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createNewProducts);

module.exports = router;