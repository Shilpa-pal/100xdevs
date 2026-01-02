/**
 * Assignment #2 - Write a function that takes a jwt as input and returns 
 * true if the jwt can be DECODED (not verified). Return false otherwise
 */

const jwt = require("jsonwebtoken")
const jwtpass = "ilovehim"

function decoded(token){
    const decoded = jwt.decode(token)
    if(decoded){
        return true
    }else {
        return false
    }
}
// here is writetn code by me 
// it says if we don't get long form of token it will return false like blow 
console.log(decoded('yyjhjkfhygh'))