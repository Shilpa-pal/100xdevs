
const express = require("express")

const bcrpyt = require("bcrypt")

// IMPORTING EXPRESS
const app = express()
const jwt = require("jsonwebtoken")
const JWT_SECRET = "@1267898"


// it connect to the mongoDb data base after "/ slash"  what ever I write it gets created in database if it were not their
moongoose.connnect("mongodb+srv://shilpapal1721_db_user: shilpapal1721_db_user@1stmongodb.zaztcuo.mongodb.net/todo_shilpa-223")

app.use(express.json())
let port = 3000

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    // I am writing the errothrown because I want to  apply try catch  error I can not send res.json message two times means to user whenevr I  caught the exception then
    //return the user this " user already exist" else return this "you are signed up" kind of if else condition.if we do this ther server get crass bacuse I resend the response it means In single request you can only send the response once
    // in noramly we can do try error but valid response to give we can use only one res.json message
    // to do properly I am using errorthrown = false
    // if the errorthrwon make it true and make sure if not errowthrown only reponse back to the user
    let errorthrown = false
    try {
        const hashPassword = await bcrpyt.hash(password, 5)
        console.log(hashPassword)

        await UserModel.creat({
            email: email,
            password: hashPassword,
            name: name
        })
    } catch (e) {

        // console.log("error while putting in the Db")
        res.json({
            message: "User already exits. "
        })
        errorthrown = true

    }
    if (!errorthrown) {
        res.json({
            message: "YOu are logged in."
        })
    }
})

app.post("/signin", async (req, res) => {
    //user only send me username and password it wont sneed name
    const email = req.body.email;
    const password = req.body.password;

    const user = UserModel.findOne({
        email: email,
        // password: password
    })
    // Using salting in signin endpoint for that 
    //step1.give me user email no need of pass so I comment it becuse if I compare user plain text
    // password  with hash it will be diff from the hash password the condition never met if I used password it can never match
    // I says mujhe bus email de do
    //step2  if there is not user in this email I return error message  to user
    // step3 bcrypt provide a function is "bcrypt.compare"


    //step2. if that no user have tis email
    if (!user) {
        res.status(403).json({
            message: " user does not exit in our Database"
        })
        return
    }

    //step3 .passowrd here mean the password send by user ,so plain password come here 
    // user.password this entry from the mongodb database, hash password come here 
    //if passwordmatch user log in 
    const passwordmatch = await bcrpyt.compare(password, user.password)
    if (passwordmatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)
        res.json({
            //return token
            token: token
        })
    } else {
        //if user isn't logged in
        res.json({
            meassge: "Incorrect credentials"
        })
    }
})

app.post("/todo", (req, res) => {
    res.json({
        message: ""
    })
})

app.get("/me", (req, res) => {
    res.json({
        message: ""
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
