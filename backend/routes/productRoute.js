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
  getProductsOfSeller,
  myProducts,
} = require("../controllers/productController");
const { isAuthenticated, authRole, isProductOwner } = require("../middleWares/auth");
const router = express.Router();


// get all product
router.route("/products").get(getAllProducts);

// get single product
router.route("/product/:id").get(getSingleProduct);

// create product ----ADMIN ---SELLER
// router.route("/product/new").post(isAuthenticated, authRole("admin"), createNewProducts);
router.route("/product/new").post(isAuthenticated, authRole("seller","admin"), createNewProducts);

// Update and Delete prodcut----ADMIN ---SELLER
router.route("/product/:id").put(isAuthenticated, authRole("admin","seller"), updateProduct)
                            .delete(isAuthenticated, authRole("seller","admin"), deleteProduct);

// create rating and review
router.route("/review").put(isAuthenticated,productRatingReview);
// get all reviews and Delete review
router.route("/reviews").get(getProductReviews).delete(isAuthenticated,deleteReview);

// my products -SELLER
router.route("/seller/products/me").get(isAuthenticated,authRole("seller"),myProducts);
// get all products of a seller
router.route("/admin/sellerProducts/:id").get(isAuthenticated,authRole("admin"),getProductsOfSeller);


module.exports = router;
