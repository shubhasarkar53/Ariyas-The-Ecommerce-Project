const express = require("express");
const { getAllProducts,
     createNewProducts, 
     getSingleProduct, 
     updateProduct, 
     deleteProduct, 
     createProductReview,
     getProductReviews,
     deleteProductReview} = require("../controllers/productController");
const { isAuthenticated, authRole } = require("../middleWares/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticated, authRole("admin"), createNewProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id")
.put(isAuthenticated,authRole("admin"),updateProduct)
.delete(isAuthenticated,authRole("admin"),deleteProduct);
router.route("/review").put(isAuthenticated,createProductReview);
router.route("/reviews")
.get(getProductReviews)
.delete(isAuthenticated,deleteProductReview);

module.exports = router;