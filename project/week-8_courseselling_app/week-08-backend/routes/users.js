// Import express module 
// let express = require('express');
// Create a new Router instance for user routes
// let router = express.Router();

// Import Router from express module
const { Router} = require("express")

// Create a new Router instance for user routes
const usersRouter = Router()

usersRouter.post("/signup", (req, res) => {
    res.json({
        message: ""
    })

})
usersRouter.post("/signin", (req, res) => {
    res.json({
        message: ""
    })

})
usersRouter.get("/purchase", (req, res) => {
    res.json({
        message: ""
    })

})


module.exports = {
    usersRouter: usersRouter
}