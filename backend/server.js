// ----------------------------------Code By Shubha start here---------------------------------------
// Whole code is changed.Do merge only my part.
// New agian

require("dotenv").config({ path: "config/config.env" });

//<------- uncaught ref err ------->

process.on("uncaughtException", (err) => {
   console.log("Server is closing due to uncaughtException");
   console.log(`Error: ${err.message}`);
   process.exit(1);
})

// <------- end of uncaught ref err ------->
// const cloudinary = require('cloudinary').v2;
const cloudinary = require('cloudinary');

cloudinary.config({
   cloud_name : process.env.CLOUDINARY_NAME,
   api_key    : process.env.CLODINARY_APIKEY,
   api_secret : process.env.CLODINARY_SECRET
});




const dbConnect = require("./config/database");

const app = require("./app");
const port = process.env.PORT;

dbConnect();

const server = app.listen(port, () => {
   console.log(`Listning to the port : ${port}`)
})

// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
   console.log("Server is closing due to unhandledRejection");
   console.log(`Error: ${err.message}`);

   server.close(() => {
      process.exit(1);
   });//now no need to use the catch block in mongodb connection.

})

// ----------------------------------Code By Shubha ends here---------------------------------------

