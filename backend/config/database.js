const mongoose = require('mongoose');
 require('dotenv');

 const connectDatabase = (req,res) =>{
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log(`MongoDB Atlast is Connected with sever: ${data.connection.host}`);
    });
 }

 module.exports = connectDatabase;