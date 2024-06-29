// create a schema for address  
const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true, "Please fill all the fields user"],
      },
      // address: {
      //   type: String,
      //   required:[true, "Please fill all the fields address"],
      // },
      town: {
        type: String,
        required:[true, "Please fill all the fields town"],
      },
      phoneNo: {
        type: Number,
        required:[true, "Please fill all the fields ph"],
      },
      flatName:{
        type: String,
        required:[true, "Please fill all the fields flat"],
      },
      area:{
        type: String,
        required:[true, "Please fill all the fields area"],
      },
      landmark:{
        type: String,
        required:[true, "Please fill all the fields landmark"],
      },

      postalCode: {
        type: Number,
        required:[true, "Please fill all the fields pincode"],
      },
      country: {
        type: String,
        required:[true, "Please fill all the fields country"],
        default:"India"
      },
      state:{
        type: String,
        required:[true, "Please fill all the fields state"],
        default:"West Bengal"
      },
      fullName:{
        type: String,
        required:[true, "Please fill all the fields fullnaame"],
      }


});
module.exports = mongoose.model('Address', addressSchema);