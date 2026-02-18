// Import express module 
// let express = require('express');
// Create a new Router instance for user routes
// let router = express.Router();

// Import Router from express module  to create route handlers
const { Router } = require("express")

// Create a new Router instance for user routes
const usersRouter = Router()


// Import userModel from the database folder to interact with user data
const { userModel, purchaseModel, courseModel } = require("../db");

// Import necessary modules for handling JWT, password hashing, and schema validation
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config")
const bcrypt = require("bcrypt");
const zod = require("zod");
const { userMiddleware } = require("../middleware/user");

usersRouter.post("/signup", async (req, res) => {

    // To send post req in postman we need to write it this http://localhost:3000/api/v1/user/signup
    // Define the schema for validating the request body data using zod
    const requireBody = zod.object({
        email: z.string().min(3).max(100).email,
        password: z.string().min(5),
        firstName: zod.string().min(3), // First name must be at least 3 characters long
        lastName: zod.string().min(3), // Last name must be at least 3 characters long

    })
    // Parse and validate the incoming request body data
    const parseDataWithSuccess = requireBody.safeParse(req.body)
    // If validation fails, return a 400 error with the validation error details
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "incorrect  data format",
            error: parseDataWithSuccess.error,
        })
    }

    //step 1:sending info into the body below mention it
    const { email, password, firstName, lastName } = req.body

    // Hash the user's password using bcrypt with a salt rounds of 5
    const hashpassword = await bcrypt.hash(password, 5)
    console.log(hashpassword)

    /* I can write this also  but it take will take diff line for every function so I above did destructuring of req.body
const email = req.body.email;
const password = req.body.password */
    try {
        await userModel.create({
            //if key and value same no need to write same word like eg email:email id it diff than use
            email: email,
            password,
            firstName: firstName,
            lastName

        });
    } catch (error) {
        // If there is an error during user creation, return a 400 error message
        res.status(400).json({
            message: "You are already signup", // Provide a message indicating signup failure
        })

    }
    // Send a 201 success response back to the client indicating successful signup
    res.json({
        message: "Signup succeeded" // Success message upon successful signup
    })

})
usersRouter.post("/signin", async (req, res) => {
    // Define the schema for validating the request body data using zod
    const requireBody = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6)
    })

    // Parse and validate the incoming request body data
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    //if validation fail, return 404 error with the validation error details
    if (!parseDataWithSuccess.success) {
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error, // Provide details about the validation error 
        })
    }
    // Extract validated email and password from the request body
    const { email, password } = req.body


    // Attempt to find the user with the provided email in the database
    const user = await userModel.findone({
        email: email,
        password: password
    })

    // If the user is not found, return a 403 error indicating incorrect credentials
    if (!user) {
        return res.status(403).json({
            message: "Incorrect Credentials!", // Error message for invalid login attempt
        });
    }
    //comapare the provided password with the stored hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password)
    //if user found,
    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSORD)
        res.json({
            token: token
        })
    } else {// if not send message 
        res.status(403).json({
            message: "incorrect credentils"
        })
    }
})

// To see all the purchases
usersRouter.get("/purchase", userMiddleware, async (req, res) => {
    // Get the userId from the request object set by the userMiddleware
    const userId = req.userId

    // Find all purchase records associated with the authenticated userId
    const purchases = await purchaseModel.find({
        userId: userId, // Querying purchases by user ID//"Give me all documents where the userId field matches this user's ID."
    });

    // If no purchases are found, return a 404 error response to the client
    if (!purchases) {
        return res.status(404).json({
            message: "No purchases found", // Error message for no purchases found
        });
    }
    // If purchases are found, extract the courseIds from the found purchases
    const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);

    // let purchasecourseId = []
    // for (let i = 0; i < purchases.length; i++) {
    //     purchasecourseId.push(purchases[i].courseId)
    // }
    const courseData = await courseModel.find({
        _id: {$in:purchasesCourseIds}
    })
    // Send the purchases and corresponding course details back to the client
    res.json({
        purchases,
        courseData
    })

})

// Export the userRouter so it can be imported and used in other parts of the application
module.exports = {
    usersRouter: usersRouter
}