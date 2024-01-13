// create a product schema 
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:2000
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    location:{
        type:String,
        required:true,
        trim:true,
        maxlength:200
    },
    quantity:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    shipping:{
        type:String,
        enum:["Yes","No"]
    },
    color:{
        type:String,
        enum:["Black","Brown","Silver","White","Blue"]
    },
    ratings:[
        {
            star:Number,
            postedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ],
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    updatedAt:Date,
    createdAt:{
        type:Date,
        default:Date.now
    },
    deletedAt:Date,
    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },


});

module.exports = mongoose.model("Product",productSchema);