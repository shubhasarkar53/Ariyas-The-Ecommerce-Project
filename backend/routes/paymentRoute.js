const express = require("express");
const router = express.Router();
const { isAuthenticated, authRole } = require("../middleWares/auth");
const { processPayment, sendStripeApiKey,cashOnDelivery } = require("../controllers/paymentController");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");


router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);
router.route("/cashondelivery").post(isAuthenticated, cashOnDelivery);
module.exports = router