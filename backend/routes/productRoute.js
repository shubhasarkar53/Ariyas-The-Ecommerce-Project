const express = require("express");
const {
  getAllProducts,
  createNewProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  productRatingReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticated, authRole, isProductOwner } = require("../middleWares/auth");
const router = express.Router();


// get all product
router.route("/products").get(getAllProducts);

// get single product
router.route("/product/:id").get(getSingleProduct);

// create product ----ADMIN ---SELLER
router.route("/product/new").post(isAuthenticated, authRole("admin","seller"), createNewProducts);

// Update and Delete prodcut----ADMIN ---SELLER
router.route("/product/:id").put(isAuthenticated, updateProduct)
                            .delete(isAuthenticated, deleteProduct);

// create rating and review
router.route("/review").put(isAuthenticated,productRatingReview);
// get all reviews and Delete review
router.route("/reviews").get(getProductReviews).delete(isAuthenticated,deleteReview);



module.exports = router;
