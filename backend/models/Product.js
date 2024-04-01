// create a product schema
// const mongoose = require("mongoose");
// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: 50,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: 2000,
//   },
//   price: {
//     type: Number,
//     required: true,
//     trim: true,
//     maxlength: 32,
//   },
//   location: {
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: 200,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   sold: {
//     type: Number,
//     default: 0,
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
 
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   numberOfReviews: {
//     type: Number,
//     default: 0,
//   },

//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//       },
//       userName: {
//         type: String,
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//       },
//       comment: {
//         type: String,
//       },
//     },
//   ],

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },

// //   updatedAt: Date,

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

// //   deletedAt: Date,
// //   deletedBy: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "User",
// //   },
// });




const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product name first"],
  },
  description: {
    type: String,
    required: [true, "Please enter Product description first"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product price first"],
    maxLength: [8, "This price  range is not allowed"],
  },
  location: {
        type: String,
        required: [true, "Please enter Product location first"],
        trim: true,
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter Product category first"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter how many stock is available "],
    maxLength: [4, "This stock range is not allowed"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
      },
      userName: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      date:{
        type: Date,
        // default: Date.now ,
        default: Date.now(),
      },
      comment: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
