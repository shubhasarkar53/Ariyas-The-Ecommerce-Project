const mongoose = require("mongoose");
const Product = require("../models/Product");
const {catchAsyncErr }= require("../middleWares/catchAsyncError");
const ErrorHandler = require("../utills/errorHandler");
const apiFeatures = require("../utills/apifeatures");


//Controller for Get All products
exports.getAllProducts = catchAsyncErr(async (req, res, next) => {
    const resultPerPage = 10;
    const productCount = await Product.countDocuments();
    const apiFeature = new apiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        productCount,
        products,
        resultPerPage
    });
});


//Conteroller for get single product using id
exports.getSingleProduct = catchAsyncErr(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler(404,"product Not Found"));;
    res.status(200).json({
        success: true,
        product,
    });
});

//controller  for create a product for --Admin access
exports.createNewProducts = catchAsyncErr(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});


//Controller for update product --Admin
exports.updateProduct = catchAsyncErr(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler(404,"product Not Found"));
    }
    product =  await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })  

});

//Controller for delete a product --Admin
exports.deleteProduct = catchAsyncErr(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler(404,"product Not Found"));
    }
    // await product.remove();
     product = await Product.findByIdAndRemove(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
});


// Rating and review creation or updation

exports.productRatingReview = catchAsyncErr(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    // if already reviewed or not
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    console.log(isReviewed);
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
      message: "Review added successfully.Thanks you.",
    });
  });
  
  // Get all the reviews of a particular product
  exports.getProductReviews = catchAsyncErr(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler(404, "Product not found"));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Rating and review deletion  (logic is to search by productId and review id of a particular product then store the review which we don't want to delete.)
  exports.deleteReview = catchAsyncErr(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler(404, "Product not found"));
    }
    
    
    //Here in the newReviews when there is only one review then it cause problem
    // because when we perform the filter base on the condition if there is one review 
    // the whole array becomes empty so we get a cast error in postman
    // BUt now it is resolved.   
    const newReviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString()); //"id"- refers to the review id which we will provide from frontend
    console.log("new review array length",newReviews.length);
    let avg = 0;
  
    console.log("Here");

    if (newReviews.length > 0) {  //here we wrap it in a if condition it will not run if the newReview array length is 0
        newReviews.forEach((rev) => {
            console.log(rev.rating);
            avg += rev.rating; 
        });
    }
    // Here when the avg = 0 and newReviews.length =0 
    //  so 0/0 = NaN (which is a falsy value) hence we give a OR || 0 
    // This is how the bug resolved.
    const ratings = avg / newReviews.length || 0; // Edge Case took One day to resolve
  
    const numberOfReviews = newReviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews: newReviews, ratings, numberOfReviews },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
      message:"review deleted."
    });
  });