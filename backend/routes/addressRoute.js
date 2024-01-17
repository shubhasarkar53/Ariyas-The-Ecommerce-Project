const express =  require("express");
const { createNewAddress } = require("../controllers/addressController");
const { isAuthenticated } = require("../middleWares/auth");

const router = express.Router();

router.route("/new/address").post(isAuthenticated, createNewAddress);

module.exports = router;