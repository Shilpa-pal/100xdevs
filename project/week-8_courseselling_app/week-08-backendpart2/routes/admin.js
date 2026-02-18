
const { Router } = require("express")
const adminRouter = Router()

// Import adminModel and courseModel from the database folder to interact with admin and course data
const { adminModel, courseModel } = require("../db")


// Import the JWT Admin Password from the config file for verification
const { JWT_ADMIN_PASSWORD } = require("../config");

// Import the adminMiddleware function to authenticate and authorize admins before allowing
const { adminMiddleware } = require("../middleware/admin");

// Import necessary modules for handling JWT, password hashing, and schema validation
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const zod = require("zod");

// Define a POST route for admin signup to create a new admin in the database
adminRouter.post("/signup", async (req, res) => {
    const requireBody = zod.object({
        email: z.string().min(3).max(100).email,
        password: z.string().min(5),
        firstName: zod.string().min(3), // First name must be at least 3 characters long
        lastName: zod.string().min(3), // Last name must be at least 3 characters long

    })
    const parseDataWithSuccess = requireBody.safeParse(req.body)
    // If validation fails, return a 400 error with the validation error details
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "incorrect  data format",
            error: parseDataWithSuccess.error,
        })
    }

    const { email, password, firstName, lastName } = req.body
    // Hash the user's password using bcrypt with a salt rounds of 5
    const hashpassword = await bcrypt.hash(password, 5)
    console.log(hashpassword)

    try {
        await adminModel.create({
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
adminRouter.post("/signin", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email(),
        password: zod.string().min(3)
    })
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if (!parseDataWithSuccess) {
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error, // Provide details about the validation error "
        })
    }
    
    // Get email and password from the request body
    const { email, password } = req.body

     // Find the admin with the given email
    const admin = await adminModel.findone({
        email,
        password
    })
    // If the user is not found, return a 403 error indicating incorrect credentials
    if (!admin) {
        return res.status(403).json({
            message: "Incorrect Credentials!", // Error message for invalid login attempt
        });
    }
        // Compare the password with the hashed password using the bcrypt.compare() method
    const passwordMatch = await bcrypt.compare(password, admin.password)

    // if admin found
    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD)
        res.json({
            token: token
        })
    } else {// if not send message 
        res.status(403).json({
            message: "incorrect credentils"
        })
    }
})
// I am not using endpoint name course becuse(/api/v1/course",courseRouter)
// /api/v1/course/course  do bar ho jayega so that i only put "/" I don't want to put any extra

// Define the admin routes for creating a course
adminRouter.post("/course", adminMiddleware, async (req, res) => {

    // Get the adminId from the request object
    const adminId = req.adminId;

    // Validate the request body data using zod schema (title, description, imageUrl, price must be valid)
    const requireBody = zod.object({
        title: zod.string().min(3),
        descrption: zod.string().min(10),
        imageUrl: zod.string().url(),// Image URL must be a valid URL
        price: zod.number().positive()
    })

    // Parse and validate the request body data
    const parseDataWithSuccess = requireBody.safeParse(req.body)

    if (!parseDataWithSuccess.success) {
        return res.json({
            message: "Incorrect data formate.",
            error: parseDataWithSuccess.error,
        })
    }

    //get title, descrption, imageUrl, price from the request body
    const { title, descrption, imageUrl, price } = req.body

    // Create a new course with the given title, description, imageUrl, price, and creatorId

    const course = await courseModel.create({
        title,
        descrption,
        imageUrl,
        price,
        creatorId: adminId
    })

    // Respond with a success message if the course is created successfully
    res.json({
        message: "course created",
        courseId: courseModel._id

    })
})
//admin can change the course name so used put 
adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId

    const requireBody = zod.object({
        courseId: zod.string().min(5), // Ensure course ID is at least 5 characters
        title: zod.string().min(3).optional(), // Title is optional
        description: zod.string().min(5).optional(), // Description is optional
        imageUrl: zod.string().url().min(5).optional(), // Image URL is optional
        price: zod.number().positive().optional(), // Price is optional
    })


    const parseDataWithSuccess = requireBody.safeParse(req.body)

    if (!parseDataWithSuccess.success) {
        return res.json({
            message: "Incorrect data formate",// Inform the client about the error
            error: parseDataWithSuccess.error, // Provide specific validation error details
        })
    }

    // Destructure the validated fields from the request body
    const { courseId, title, description, imageUrl, price } = req.body;


    // Update the course details in the database using the updates object
    const course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId
    })
    if (!course) {
        return res.status(404).json({
            messahe: "course not found"
        })
    }
    // Update the course details in the database using the updates object
    await courseModel.updateOne(
        {
            _id: courseId,//Match the course by id
            creatorId: adminId// ensure the admin is creator
        }, {
        title: title || course.title, // Update title if provided, otherwise keep the existing title
        description: description || course.description, // Update description if provided, otherwise keep the existing description
        imageUrl: imageUrl || course.imageUrl, // Update imageUrl if provided, otherwise keep the existing imageUrl
        price: price || course.price, // Update price if provided, otherwise keep the existing price
    }
    )

    // Respond with a success message upon successful course update
    res.status(200).json({
        message: "course updated",
        corseId: course._id
    })
})
// Define the admin routes for deleting a course
adminRouter.delete("/course", adminMiddleware, async (req, res){

    const adminId = req.adminId
    const requireBody = zod.object({
        courseId: zod.string().min(5)
    })

    // parse and validate the request body data 
    const parseDataWithSuccess = requireBody.safeParse(req.body)

    // If the data format is incorrect, send an error message to the client
    if (!parseDataWithSuccess.success) {
        return res.json({
            messahe: "incorrect data formate",
            error: parseDataWithSuccess.error
        })
    }

    //get the course id from req.body
    const { courseId } = req.body

    // find the course with the given courseId and creatorId
    const course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId
    })
       // If the course is not found, send an error message to the client
    if (!courseId) {
        return res.status(400).json({
            message: "course not found"
        })
    }

    // Delete the course with the given courseId and creatorId
    await courseModel.deleteOne({
        _id: courseId,
        creatorId: adminId,
    });
    // Respond with a success message upon successful course update
    res.status(200).json({
        message: "Course deleted!",
    });

})

// to get all the courses
adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    // Get the adminId from the request object
    const adminId = req.userId

    // Find all courses with the given creatorId
    const course = await courseModel.findOne({
        creatorId: adminId
    })
    // Respond with the courses if they are found successfully
    res.status(200).json({
        courses: courses,
    });
})

//export the adminRouter so that it can be used in other files
module.exports = {
    adminRouter: adminRouter

}