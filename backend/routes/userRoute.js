const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controllers/userController");
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

module.exports = router;