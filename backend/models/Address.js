// create a schema for address  
const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true, "Please fill all the fields"],
      },
      address: {
        type: String,
        required:[true, "Please fill all the fields"],
      },
      city: {
        type: String,
        required:[true, "Please fill all the fields"],
      },
      phoneNo: {
        type: Number,
        required:[true, "Please fill all the fields"],
      },
      postalCode: {
        type: Number,
        required:[true, "Please fill all the fields"],
      },
      state:{
        type: String,
        required:[true, "Please fill all the fields"],
      },
      country: {
        type: String,
        required:[true, "Please fill all the fields"],
        default:"IN"
      },
});
module.exports = mongoose.model('Address', addressSchema);