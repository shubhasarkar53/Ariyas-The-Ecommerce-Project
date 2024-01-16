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
    if (!product) return next(new ErrorHandler("Product Not Found", 404));
    res.status(200).json({
        success: true,
        product,
    });
});

//controller  for create a product for --Admin access
exports.createNewProducts = catchAsyncErr(async (req, res, next) => {
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
        return next(new ErrorHandler("Product Not Found",404));
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
        return next(new ErrorHandler("product Not Found",404));
    }
    // await product.remove();
     product = await Product.findByIdAndRemove(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
});


//Controller for Create new review or Update review
exports.createProductReview = catchAsyncErr(async(req,res,next)=>{
    const {rating,comment,productId} = req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );
    if(isReviewed){
        product.reviews.forEach(review=>{
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        });
    }else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc,item)=>item.rating + acc,0)/product.reviews.length;
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        review
    })
});

//Controller for getting all reviews of a product
exports.getProductReviews = catchAsyncErr(async(req,res,next)=>{
    let product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
});


// ptoblrm in delet review 

//Controller for delete reviews
// exports.deleteProductReview = catchAsyncErr(async(req,res,next)=>{
//     let product = await Product.findById(req.query.id);
//     if(!product){
//         return next(new ErrorHandler("Product Not Found",404));
//     }
//     const reviews = product.reviews.filter(r=>r._id.toString() !== req.query.id.toString());
//     const numberOfReviews = reviews.length;
//     const ratings = product.reviews.reduce((acc,item)=>item.rating + acc,0)/reviews.length;
//     await Product.findByIdAndUpdate(req.query.productId,{
//         reviews,
//         numberOfReviews,
//         ratings
//     },{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     });
//     res.status(200).json({
//         success:true,
//         message:"Review Deleted Successfully"
//     })
// });