
const express = require("express")
const JWT = require("jsonwebtoken")
const JWT_SECRET = "shilpa123"
const app = express()
app.use(express.json())   // it let me extract json body from the request 
let port = 3000

let users = []
app.post("/signin", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password: password
    })
    // we should check user with username already exist
    // step:2verifying the jwt
    res.json({
        message: "you are signed in"
    })
})
//we are genrating the jwt in second step
app.post("/signup", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let founduser = null
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            founduser = users[i]
        }
    }
    //if user does't exit we should send back creditinal incorrec
    if (!founduser) {
        res.json({
            message: "Credential incorrect"
        })
        return;
    } else { // if usersdoes exit then we retrun send back to taken 

        const token = JWT.sign({
            username
        }, JWT_SECRET)
        res.json({
            //we send back this is your token
            token: token
        })
    }
})
function auth(req,res,next){
    const token = req.headers.token
    const decodedData = JWT.verify(token,JWT_SECRET)
    if(decodedData.username){
        next()
    }else{
        res.json({
            message:""
        })
    }
}
app.get("/me", (req, res) => {
    const token = req.headers.token;

    const decodedData = JWT.verify(token, JWT_SECRET)
    if (decodedData.username) {
        //the token users send me now  i found the token then golobl users array
        //try to find username  so that i can retun that 
        let founduser = null
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === decodedData.username) {
                founduser = users[i]
            }
        }
        res.json({
            usersname: founduser.username,
            password: founduser.password
        })
    }

})
app.listen(port, () => {
    console.log(`this port listen on ${port}`)
})