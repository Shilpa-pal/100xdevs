
// import express ,jsonwebtoken and mongoose
const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
// const JWT_SECRET = "shilpa@123"

// Import the route handlers for user, course, and admin functionality from the routes folder
const { usersRouter } = require("./routes/users")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/courses")


// Initialize the express application
const app = express()

// Middleware to parse JSON bodies
app.use(express.json());

/* api/vi/ donating it's An API route (as opposed to fronted).v1 is the version. this is the
standard way of defining API routes.

Import the userRouter, courseRouter, adminRouter from the routes folder
what below code does? if any req come from /api/v1/user it will be handle by 'usersRouter' and if we looked at userRouter
here we say  any req comes from "/" slash signup that means slash any req come from /api/v1/user slash signup it will be handle by  "res.json" this guy that is what routing is
and it is used Router() function to just structure  your application little bit better not have  all routes in single file*/

// Use the imported routers for handling specific routes
// All user-related requests will go to /api/v1/user
app.use("/api/v1/user", usersRouter);

// All admin-related requests will go to /api/v1/admin
app.use("/api/v1/admin", adminRouter);

// All course-related requests will go to /api/v1/course
app.use("/api/v1/course", courseRouter);
const port = 3000

// Main function to handle database connection and server start
async function main() {
    try {
        await mongoose.connect("mongodb+srv://shilpapal1721_db_user:uPutYYsK1tMguKTY@1stmongodb.zaztcuo.mongodb.net/coursera-app")

        // Log a success message to the console if the database connection is established
        console.log("Connected to the database");

        // Start the server and listen for incoming requests on the specified PORT
        app.listen(port, () => {
            console.log("It listing on port" + port)
        })
    } catch (error) {
        // Log an error message if the connection to the database fails
        console.error("Failed to connect to the database", error);

    }
}
// Invoke the main function to initiate the server and database connection
main()


