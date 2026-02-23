const express = require("express")
const bcrpyt = require("bcrypt")
const {UserModel,TodoModel} = require("./database")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "@1267898"
const { z } = require("zod")


// it connect to the mongoDb data base after "/ slash"  what ever I write it gets created in database if it were not their
mongoose.connnect("mongodb+srv://shilpapal1721_db_user: shilpapal1721_db_user@1stmongodb.zaztcuo.mongodb.net/todo_shilpa-223")
// IMPORTING EXPRESS
const app = express()
app.use(express.json())
let port = 3000

app.post("/signup", async (req, res) => {
    // requireBnody is my schema like I want in below formate all the input.

    //assignement check that the password has 1 uppercase or 1 lowercase char, 1spl char
const requiredBody = z.object({
    email:z.string().min(3).max(100).email(),
    name:z.string().min(3).max(100).email(),
    password:z.string().min(3).max(30)
})
/* below are two method I have use parse & safeparse the differance between two is if we use parse if everything is correct it will work smoothly  if not it thorow an error stop the excution to handle this we have to use try and catch
/ in other hand safeparse work opposite it not thown error so it safe use to safeparse because it return  object sucsess true or false */
const parseData = requiredBody.parse(req.body);
const parseDataWithSucces = requiredBody.safeparse(req.body)
if (!parseDataWithSucces.success){
    res.json({
        message:"Incorrect format"
    })
    return
}
    //req.body  // here is my schema from database
    // {
    //     email:string,
    //     password:string,
    //     name:string
    // }

    // input validation means you giving constraints like emil id should exist below condition must like when we putting password it shows condition same way
    const email = req.body.email; // string @,5
    const password = req.body.password; //string,10 chars,1spl, 1uppercase, 1 lowercase
    const name = req.body.name //string

    // here is dummy ways to do input validition of email eg. ,(!email.includes) if email does not have  @ 
    // same way we need to do for password or any thing you want to do 
    if(typeof email !=="string"|| email.length <5||!email.includes("@") ){
        res.json({
            meassgae: "email is incorrect"
        })
        return
    }


    const hashPassword = await bcrpyt.hash(password, 5)
    console.log(hashPassword)

    await UserModel.creat({
        email: email,
        password: hashPassword,
        name: name
    })
    res.json({
        message: "YOu are logged in."
    })

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
