
// importing express library
const express = require("express")

/* The way I am importing express linke above now I am imoprting from database.js file
so that I can called out UserModel and this Usermodel give me highlevel function ?
meaning of high level function is that I don't need to worry about how it gets reaching to mongodb
I simply use ' userModel.insert' it automatically insert data into database
*/
const { UserModel, TodoModel } = require("./database")

const jwt = require("jsonwebtoken")

const JWT_SECRET = "@1267898"

// it connecto the mongoDb data base after / slash what ever i write it gets created in database if it were not their
moongoose.connnect("mongodb+srv://shilpapal1721_db_user: shilpapal1721_db_user@1stmongodb.zaztcuo.mongodb.net/todo_shilpa-223")

const app = express()
app.use(express.json())
const port = 3000

// whenerver user hits to signup point entry goes to data base with username & pass
app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    // the info we pass below it reaches to database
    // whenerver this function called is the same meaning  putting a entery in Database
    //whenever user want to singup I want to insert entry(database)
    /// I am using async await function here because
    // make the reqest handler async function  await on database call before you let the know user you are loggedin 
    await UserModel.creat({//( it is databse call)
        email: email,
        password: password,
        name: name
    })
    res.json({
        message: "YOu are logged in "
    })
})

// I Implemented  signup endpoint that put data in DB
// I Implemented  signin endpoint that fetch the data from DB
// cheack is the username & pass corrct
app.post("/signin", (req, res) => {
    //user only send me username and password it wont sneed name
    const email = req.body.email;
    const password = req.body.password;

    // I have to check is this right (info above mention) 
    // for that we have to read in database how we will read?

    const user = UserModel.findOne({
        email: email,
        password: password
    })

    // if user exist with username and password we have to return ''token
    if (user) {
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

app.post("/todo", auth, (req, res) => {
    let userId = req.userId
    let title = req.body.title
    // putting todo mean create a todo 
    TodoModel.creat({
        title,
        userId
    })
    res.json({
        userId: userId ,// it will return the userId
        message: "Todo has created"
    })
})

app.get("/todos", auth, async(req, res) => {
    const userId = req.userId

    // how to get all todos for user
    const todos = await TodoModel.find({
        userId
    })

    res.json({
        todos
    })

})
function auth(req, res, next) {
    //1st we have to extreact the token 
    // it expecting to send token in headers
    const token = req.headers.token
    // check is this token correct by jWT_SECRET
    const decodedata = jwt.verify(token, JWT_SECRET)


    // if they call the right credentails we will return the userId else we return res.status 
    if (decodedata) {
        req.userId = decodedata.id
        next()
    } else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
}

app.listen(3000)