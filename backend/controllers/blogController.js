const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const apiFeatures = require("../utills/apifeatures");
const User = require("../models/User");
const cloudinary = require('cloudinary');

//Controller for Get All blogs 
exports.getAllBlogs = catchAsyncErr(async (req, res, next) => {
    const blogCount = await Blog.countDocuments();
    const apiFeature = new apiFeatures(Blog.find(), req.query);
    const blogs = await apiFeature.query;
    res.status(200).json({
        success: true,
        blogCount,
        blogs,
    });
});

//Conteroller for get single blog using id
exports.getSingleBlog = catchAsyncErr(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler(404, "Blog Not Found"));
    }
    res.status(200).json({
        success: true,
        blog,
    });
});

//controller  for create a product for --Admin/seller access

exports.createNewBlog = catchAsyncErr(async (req, res, next) => {
    req.body.user = req.user.id;
    // console.log("Image Data:", req.body.image);

    if (req.body.image !== "") {
        // console.log("entered into if ")
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "blogesImg",
            quality: 'auto:best',
            format: 'webp',
            resource_type:"auto",
        })
        // console.log("Uploadded to cn");
        req.body.image = {
            publicId: myCloud.public_id,
            url: myCloud.secure_url
        }
        // console.log("avatr obj edted with pId and Url");

    }

    const blog = await Blog.create(req.body);
    res.status(201).json({
        success: true,
        blog,
    });
})

//Controller for update blog --Admin ---SELLER
exports.updateBlog = catchAsyncErr(async (req, res, next) => {

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler(404, "Blog Not Found"));
    }

    if (blog.user.toString() !== req.user.id.toString() &&
        req.user.role !== "admin") {
        return next(
            new ErrorHandler(401, "You are not authorized to update this blog")
        );
    }



    if (req.body.image !== "") {
        const theBlog = await Blog.findById(req.params.id)
        //remove old image from cloudinary
        // console.log("skipping If");
        if (theBlog.image.publicId) {
            const imgId = theBlog.image.publicId;
            await cloudinary.v2.uploader.destroy(imgId);
        }
        // console.log("skipped If");
        // console.log("Uploading to cn");

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "productsImg",
            width: 150,
            crop: "scale",
            quality: 'auto:low'
        })
        req.body.image = {
            publicId: myCloud.public_id,
            url: myCloud.secure_url
        }
    }
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        blog,
    });
});


//Controller for delete blog --Admin --SELLER
exports.deleteBlog = catchAsyncErr(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler(404, "Blog Not Found"));
    }

    if (blog.user.toString() !== req.user.id.toString() &&
        req.user.role !== "admin") {
        return next(
            new ErrorHandler(401, "You are not authorized to delete this blog")
        );
    }

    blog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });

});

// See your all created blogs -- SELLER

exports.myblogs = catchAsyncErr(async (req, res, next) => {
  
    const blogs = await Blog.find();
    const sellerAllBlogs = blogs.filter(
      (blog) => blog.user.toString() === req.user.id.toString()
    );
    res.status(200).json({
      success: true,
      seller: req.user.name,
      sellerAllBlogs
    });
  });

