const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword,updateProfile } = require("../controllers/userController");
const { isAuthenticated } = require("../middleWares/auth");
const router = express.Router();

// Register new user
router.route("/register/new").post(registerUser);
// login user
router.route("/login").post(loginUser);
// logout user
router.route("/logout").get(logoutUser);
// forgot password
router.route("/password/forgot").post(forgotPassword);
// reset password
router.route("/password/reset/:token").put(resetPassword);
//update profile info
router.route("/profile/update").put(isAuthenticated, updateProfile);

module.exports = router;