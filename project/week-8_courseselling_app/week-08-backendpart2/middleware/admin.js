
// Import the jwt module to handle JSON Web Tokens
const jwt = require("jsonwebtoken");

// Import the JWT User Password from the config file for verification
const { JWT_USER_PASSWORD } = require("../config");


// Define the userMiddleware function to verify the user token
function adminMiddleware(req,res,next){
       // Get the token from the request headers, which is expected to be sent in the authorization header
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD)

    // if decoded exit than I set req.userId = decoded.id
    if(decoded){
        req.adminId = decoded.id
        next()
    }else{
        res.ststus(403).json({
            message:"You are not signed in"
        })
    }
}

// Export the adminMiddleware function so that it can be used in other files
module.exports = {
    adminMiddleware: adminMiddleware // Exporting the middleware for use in routes
}