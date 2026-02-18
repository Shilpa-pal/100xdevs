
const { Router } = require("express")
// Import purchaseModel and courseModel from the database folder to interact with purchase and course data
const { purchaseModel, courseModel } = require("../db")
const courseRouter = Router()

// Import userMiddleware to authenticate and authorize users before allowing access to routes
const { userMiddleware } = require("../middleware/user");

// Define a POST route for purchasing a course, with user authentication middleware applied
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    // Extract userId from the request object, which was set by the userMiddleware
    //Because it is Verified, Secure and Set by middleware that's why we not use body in below
    const userId = req.userId

    // Extract courseId from the request body sent by the client
    //courseId comes from client request body (user input)
    const courseId = req.body.courseId
    // If courseId is not provided in the request body, return a 400 error response to the client
    if (!courseId) {
        return res.status(400).json({
            message: "Please provide a courseId", // Error message sent back to the client
        });
    }
     // Check if the user has already purchased the course by querying the purchaseModel with courseId and userId
    const existingPurchase = await purchaseModel.findOne({
        courseId: courseId,
        userId: userId,
    });

     // If the user has already purchased the course, return a 400 error response to the client
    if (existingPurchase) {
        return res.status(400).json({
            message: "You have already bought this course",
        });
    }
    
    // Try to create a new purchase entry in the database with the provided courseId and userId
    await purchaseModel.create({
        userId, // The ID of the user making the purchase
        courseId // The ID of the course being purchased
    })
 // If the purchase is successful, return a 201 status with a success message to the client
    res.status(201).json({
        message: "You have successfully bought the course", // Success message after purchase
    });

})

// it give all the courses that corrently present
// this end point doesn't need to authenticates means user can see  course and price of the course .

// Define a GET route for previewing course details without authentication
courseRouter.get("/preview", async function (req, res) {

    //give me the all the courses, empty array give all the courses
    const courses = await courseModel.find({})
    res.json({
        courses// return the courses to the users
    })

})


// Export the courseRouter so that it can be used in other files
module.exports = {
    courseRouter: courseRouter
}
/*
instead of this method we witten like above it reduce redundant
function createUserRoutes() {
    app.get("/course/preview", function (req, res) {
        // you would expect the user to pay money to purchase a course

        res.json({
            message: "Priview endpoint!",
        });
    });

    app.get("/courses", function (req, res) {
        res.json({
            message: "Pourses endpoint!",
        });
    });
    module.exports = {
    createUserRoutes: createUserRoutes,
};
}*/
