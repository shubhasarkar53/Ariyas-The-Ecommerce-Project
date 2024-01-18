const express =  require("express");
const { createNewOrder } = require("../controllers/orderController");
const { isAuthenticated } = require("../middleWares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, createNewOrder);


module.exports = router;
