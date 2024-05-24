// create a schema for blog 
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [true, "Please enter Title"],
    },
    description: {
        type: String,
        required: [true, "Please enter Description"],
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
      location:{
        type: String,
        required: [true, "Please enter location"],
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);