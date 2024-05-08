const express =  require("express");
const { createNewOrder, getSingleOrder, getLoggedInUserOrders, getAllOrders, deleteOrder, updateOrderStatus, getAllIncomingOrders, updateOrderStatusForSeller } = require("../controllers/orderController");
const { isAuthenticated, authRole } = require("../middleWares/auth");
const router = express.Router();


//user routes

//create a new order route
router.route("/order/new").post(isAuthenticated, createNewOrder);

//fetch logged in user single order details
router.route("/order/:id").get(isAuthenticated,getSingleOrder);

//fetch logged in user all orders
router.route("/orders/me").get(isAuthenticated, getLoggedInUserOrders);


// admin routes

//fetch all orders --Admin
router.route("/admin/orders").get(isAuthenticated, authRole("admin"), getAllOrders);

//GetAllIncoming Order details, UpdateOrderStatus,delete order --Admin
router.route('/admin/order/:id')
.delete(isAuthenticated, authRole('admin'), deleteOrder)
// .put(isAuthenticated, authRole('admin'), updateOrderStatus);

//GetAllIncoming Order details
router.route('/getallorders/incoming/seller').get(isAuthenticated,getAllIncomingOrders);



// seller routes

// updateSellerOrder status
router.route("/update-order-status/seller/:id").put(isAuthenticated,authRole("admin","seller"),updateOrderStatusForSeller)








module.exports = router;
