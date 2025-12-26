
const express = require("express")
const JWT = require("jsonwebtoken")
const JWT_SECRET = "shilpa123"
const app = express()

// used middleware to parse a data
app.use(express.json())   // it let me extract json body from the request 
let port = 3000

let users = []
// below line help to know from which method get called
function logger(req, res, next) {
    console.log(`${req.method}," request came"`)
    next()
}

//localhost:3000,cors (I am using this becuse my fronted and backend will be on same page )
app.get("/", function (req, res) {
    // if you don't know what __dirname does you can paste here all html file content here it does the same thing   
    res.sendFile(__dirname + "/public/index.html");// __dirname it shows corrent direactry

})
app.post("/signin", logger, (req, res) => {// if we are using req.body we should use middleware 
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
app.post("/signup", logger, (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // we have to check is this username and password is correct
    // we wrighting a code to check is the user exist in global array ([])
    let founduser = null
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            // we have found the user in past and storing in founduser varible
            founduser = users[i]
        }
    }
    //if user does't exit we should send back Credentials incorrect"
    if (!founduser) {
        res.json({
            message: "Credential incorrect"
        })
        return;
    } else { // if users does exit then we retrun send back the taken 
        // how we return back to token?
        //  what we need to do when user sigin? we should return back the token.
        // so how can we create a token ?
        // so I had said we use JWt  library to cretae a token.

        const token = JWT.sign({
            username: founduser.username // we don't need to send password 
        }, JWT_SECRET)
        res.json({
            //we send back this is your token
            token: token
        })
    }
})

// logout the function 
function logout() {
    localStorage.removeItem("token")
}
logout()

function auth(req, res, next) {
    // we are using the middleware the below code would repeat to every method that's why we put the below code
    // into middleware but we have to call fuction into every method.
    // we had to extact the token ,then verify the token and we can add repeated statement 
    //extact the token 
    const token = req.headers.token
    //verifying the token

    const decodedData = JWT.verify(token, JWT_SECRET)
    //if decodedata.username does exist than call next()
    if (decodedData.username) {
        req.username = decodedData.username
        next()
        //else it should end the request right here 
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}
//whenerve i get on /me end point it give me information of about me and my courses and my todo etc.
app.get("/me", logger, auth, (req, res) => {
    // const token = req.headers.token;
    // const decodedData = JWT.verify(token, JWT_SECRET)
    // if (decodedData.username) {
    //the token users send me now  i found the token then golobl users array
    //try to find username  so that i can retun that 
    let founduser = null
    for (let i = 0; i < users.length; i++) {
        // if (users[i].username === decodedData.username) {// their is no decodeded data handler.knows ki user authenenticated but doesn't know who is the user.
        // here we not getting access of decodedata.username becuse above is not any veriable of decoded that 
        if (users[i].username === req.username) {// so we have to change a req body in auth function. I have comment out null above all code becuse it is repeated code of in auth function also so we not need to write same thing agian and agin
            // so for the we create a verive of req.username = decodedata.username we need to add in auth function so that it can get access of all the rouths method
            founduser = users[i]
        }
    }
    res.json({
        username: founduser.username,
        password: founduser.password
    })
}

)
app.listen(port, () => {
    console.log(`this port listen on ${port}`)
})