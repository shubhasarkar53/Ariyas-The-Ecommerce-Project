// ----------------------------------Code By Shubha start here---------------------------------------
// Whole code is changed.Do merge only my part.
// New agian

require("dotenv").config({ path: "backend/config/config.env" });

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


// cloudinary.config({
//    cloud_name_2 : process.env.CLOUDINARY_NAME_2,
//    api_key_2    : process.env.CLODINARY_APIKEY_2,
//    api_secret_2 : process.env.CLODINARY_SECRET_2
// });

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

//Explanation for uncaughtException

// This code sets up an event handler for the "uncaughtException" event in a Node.js application.
//  The "uncaughtException" event is emitted when an unhandled exception occurs in the application,
//   i.e., when an error is thrown but not caught anywhere in the code. Here's an explanation of each
//   part of the code:

// 1. `process.on("uncaughtException", (err) => { ... })`: This line registers an event listener for
//  the "uncaughtException" event on the Node.js `process` object. When an unhandled exception occurs
//  anywhere in the application, the provided callback function is executed, and it receives the error
//   object (`err`) as its argument.

// 2. `console.log(`ERROR: ${err.message}`);`: Inside the event handler, this line logs the error
// message of the uncaught exception to the console. It uses template literals to format the message
//  and include the error message.

// 3. `console.log("Shutting down the server due to uncaught exceptions");`: This line logs a message
// indicating that the server is being shut down due to uncaught exceptions. When unhandled exceptions
//  occur, they can leave the application in an inconsistent or unpredictable state, so it's often a
//  good practice to gracefully shut down the server to prevent further issues.

// 4. `process.exit(1);`: This line forcefully terminates the Node.js process with an exit code
// of `1`. Exiting with a non-zero exit code typically indicates an error or abnormal termination.
//  By setting an exit code of `1`, it signals that the application terminated due to unhandled
//  exceptions.

// In summary, this code sets up a handler for uncaught exceptions in the Node.js application.
// When an unhandled exception occurs, it logs the error message, prints a message about shutting
// down the server, and forcefully exits the process with an exit code of `1`. This helps ensure
// that unhandled exceptions don't leave the application in an unstable state and can be useful
// for debugging and error tracking. However, it's important to note that relying on uncaught
//  exception handling is generally considered a last-resort measure, and it's better to handle
//  exceptions proactively in your code whenever possible.






//Explanation for unhandledRejection

// This code sets up an event handler for the "unhandledRejection" event in a Node.js application.
//  The "unhandledRejection" event is emitted when a promise is rejected but no `.catch()` or `await`
//  with error handling is used to handle the rejection. Here's an explanation of each part of the code:

// 1. `process.on("unhandledRejection", (err) => { ... })`: This line registers an event listener for
// the "unhandledRejection" event on the Node.js `process` object. When a promise is rejected without
// proper error handling, the provided callback function is executed, and it receives the rejection
// reason (the error) as its argument (`err`).

// 2. `console.log(`ERROR: ${err.message}`);`: Inside the event handler, this line logs the error
// message of the unhandled promise rejection to the console. It uses template literals to format the
// message and include the error message.

// 3. `console.log("Shutting down the server due to unhandled promise rejection");`: This line logs
//  a message indicating that the server is being shut down due to an unhandled promise rejection.
//   Unhandled promise rejections can potentially leave the application in an inconsistent state,
//    so shutting down the server is a way to prevent further issues.

// 4. `server.close(() => { process.exit(1); })`: This code appears to be assuming that there is a
//  `server` object defined elsewhere in the code. It attempts to gracefully close the server by calling
//   its `.close()` method. Once the server is closed, the `process.exit(1)` function is called to
//   forcefully terminate the Node.js process with an exit code of `1`. Exiting with a non-zero exit
//   code indicates an abnormal termination due to an unhandled promise rejection.

// In summary, this code sets up a handler for unhandled promise rejections in the Node.js
// application. When a promise is rejected without proper error handling, it logs the error message,
// prints a message about shutting down the server, attempts to close the server gracefully, and then
// forcefully exits the process with an exit code of `1`. This is done to prevent unhandled promise
//  rejections from leaving the application in an unstable state. It's important to note that handling
//   promise rejections gracefully by using `.catch()` or `await` with error handling is generally a
//   better practice than relying on unhandled rejection event handlers.