
// import express jsonwebtoken and mongoose
const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "shilpa@123"

const {usersRouter} = require("./routes/users")
const{adminRouter} = require("./routes/admin")
const {courseRouter} = require("./routes/course")
const app = express()

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/vi/user",usersRouter);
app.use("/api/vi/admin",adminRouter);
app.use("/api/vi/course",courseRouter);
const port  = 3000




app.listen(port,()=>{
    console.log("It listing on port" + port)
})

