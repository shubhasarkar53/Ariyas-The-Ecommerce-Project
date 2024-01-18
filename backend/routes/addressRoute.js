const express =  require("express");
const { createNewAddress, getSingleAddress, updateAddress, deleteAddress, getAllAddress } = require("../controllers/addressController");
const { isAuthenticated } = require("../middleWares/auth");

const router = express.Router();

//route to create new address
router.route("/new/address").post(isAuthenticated, createNewAddress);

//route to get single address
router.route("/single/address").get(isAuthenticated, getSingleAddress);

//route to update address
router.route("/address/update/:id").post(isAuthenticated,updateAddress);

//route to delete address
router.route("/address/delete/:id").delete(isAuthenticated, deleteAddress);

//route to get all address
router.route("/address/all").get(isAuthenticated,getAllAddress);



module.exports = router;