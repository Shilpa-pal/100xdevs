/**
 * Assignment #1 - Write a function that takes in a username and password and returns
 * a JWT token with the username encoded. Should return null if the username is
 * not a valid email or if the password is less than 6 characters. Try using the zod library here
 */
const jwt = require("jsonwebtoken")

// define the jwt secret key 
const jwtPassword = "secret";
const zod = require("zod")


const emilSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username,password){
    const usernameResponse = emilSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null
    }

const signature = jwt.sign({
    username
},jwtPassword);
return signature
}
// way to write jwt.sign above used object 
// const token = jwt.sign(value,"secret")
// console.log(token) // it will log the token 

const ans = signJwt("dilpa1721@gmail.com","689068895")
console.log(ans)
