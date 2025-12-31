const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const port = 3000
app.use(express.json)

//decode,verify,generate
const value = {
    name:"shilpa",
    accountnumber:12345
}

//jwt the function of genrate function is sign

const token = jwt.sign(value,"secret")
// this token has been generated using this secreat and hence this tokencan only be verified using this secret
//note: any one decoded without a secret
// but they will ever verify ht
console.log(token) // it will log the token 
app.listen(port,()=>{
    console.log("It is the port listen on" + port)
})
