/**
 * Assignment #1 - Write a function that takes in a username and password and returns
 * a JWT token with the username encoded. Should return null if the username is
 * not a valid email or if the password is less than 6 characters. Try using the zod library here
 */
// Import jwt and zod library
const jwt = require("jsonwebtoken")

// define the jwt secret key 
const jwtPassword = "secret";
const zod = require("zod")


const emilSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    const usernameResponse = emilSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if (!usernameResponse.success || !passwordResponse.success) {
        return null
    }

    const signature = jwt.sign({
        username
    }, jwtPassword);
    return signature
}
// way to write jwt.sign above used object 
// const token = jwt.sign(value,"secret")
// console.log(token) // it will log the token 

const ans = signJwt("dilpa1721@gmail.com", "689068895")
console.log(ans)
/**
 * Assignment #2 - Write a function that takes a jwt as input and returns 
 * true if the jwt can be DECODED (not verified). Return false otherwise
 */


// function to decode the jwt token
function decoded(token) {
    // decode the jwt token
    const decoded = jwt.decode(token)

    // if the jwt token is decoded then return true otherwise return false
    if (decoded) {
        return true
    } else {
        return false
    }
}
// here is writetn code by me 
// it says if we don't get long form of token it will return false like blow 
console.log(decoded('yyjhjkfhygh'))

/**
 * Assignment #3 - Write a function that takes a jwt as input and returns
 * true if the jwt can be VERIFIED. Return false otherewise
 */

// function to verify the jwt token
function verifyJwt(token) {
    let ans = null
    // try catch block to handle the error while verifying the jwt token
    try {
        const verified = jwt.verify(token, jwtPassword) // if this does not through exception then function simply return true
        // if (verified) {
        //  // if the jwt token is verified then return true
        //     return true    
    } catch (error) {
        // if the jwt token is not verified then return false
        return false
    }
    return ans
}

// call the verifyJwt function with the jwt token
console.log(verifyJwt("8ujhjksgjjsh"))
