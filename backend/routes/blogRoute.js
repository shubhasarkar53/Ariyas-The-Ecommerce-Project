const express = require("express");
const { isAuthenticated, authRole } = require("../middleWares/auth");
const { getAllBlogs, createNewBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const router = express.Router();

// get all blogs 
router.route("/blogs").get(getAllBlogs);

// create  blogs 
router.route("/blog/new").post(isAuthenticated, authRole("admin", "seller"), createNewBlog);

//update and delete blog admin seller 
router.route("/blog/:id").put(isAuthenticated, authRole("admin", "seller"), updateBlog)
    .delete(isAuthenticated, authRole("admin", "seller"), deleteBlog);

//  get products cerated by seller or admin 
router.route("/blogs/me").get(isAuthenticated, authRole("admin", "seller"), getAllBlogs);
module.exports = router
