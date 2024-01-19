const express =  require("express");
const { createNewOrder, getSingleOrder, getLoggedInUserOrders, getAllOrders, deleteOrder, updateOrderStatus } = require("../controllers/orderController");
const { isAuthenticated, authRole } = require("../middleWares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, createNewOrder);
router.route("/order/:id").get(isAuthenticated,getSingleOrder);
router.route("/orders/me").get(isAuthenticated, getLoggedInUserOrders);
// admin routes
router.route("/admin/orders").get(isAuthenticated, authRole("admin"), getAllOrders);
router.route('/admin/order/:id')
.delete(isAuthenticated, authRole('admin'), deleteOrder)
.put(isAuthenticated, authRole('admin'), updateOrderStatus);




module.exports = router;
