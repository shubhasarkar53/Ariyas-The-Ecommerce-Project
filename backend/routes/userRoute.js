const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getAllUser, getUserDetails, updateUserPassword, updateUserDetails, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticated, authRole } = require("../middleWares/auth");
const router = express.Router();

// Register new user
router.route("/register/new").post(registerUser);
// // login user
router.route("/login").post(loginUser);
// // logout user
router.route("/logout").get(logoutUser);
// // forgot password
router.route("/password/forgot").post(forgotPassword);
// // reset password
router.route("/password/reset/:token").put(resetPassword);


// getalluse
router.route("/getusers").get(getAllUser); 
// get user details
router.route("/me").get(isAuthenticated,getUserDetails); 
// update /change pwd
router.route("/password/update").put(isAuthenticated,updateUserPassword); 
// update user profile
router.route("/me/update/profile").put(isAuthenticated,updateUserDetails); 
// update user profile Role --Admin
router.route("/admin/update/role/:id").put(isAuthenticated,authRole("admin"),updateUserRole); 
// delete user/seller
router.route("/admin/user/delete/:id").delete(isAuthenticated,authRole("admin"),deleteUser);

module.exports = router;