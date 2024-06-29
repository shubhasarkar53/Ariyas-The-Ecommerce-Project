const express =  require("express");
const { createNewAddress, updateAddress, deleteAddress, getAllAddress, getUserAllAddress } = require("../controllers/addressController");
const { isAuthenticated, authRole } = require("../middleWares/auth");

const router = express.Router();

//route to create new address
router.route("/new/address").post(isAuthenticated, createNewAddress);

//route to update address
router.route("/address/update/:id").put(isAuthenticated,updateAddress);

//route to delete address
router.route("/address/delete/:id").delete(isAuthenticated, deleteAddress);

//route to get all address --ADMIN 
router.route("/address/all").get(isAuthenticated, authRole("admin") , getAllAddress);
// useres all addresses
router.route("/address/me").get(isAuthenticated,getUserAllAddress);


module.exports = router;