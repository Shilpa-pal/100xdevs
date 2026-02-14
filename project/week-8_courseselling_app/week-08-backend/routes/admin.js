
const { Router } = require("express")
const adminRouter = Router()
const {adminModel} = require("../db")


adminRouter.post("/signup", (req, res) => {
    res.json({
        message: ""
    })

})
adminRouter.post("/signin", (req, res) => {
    res.json({
        message: ""
    })

})

// I am not using endpoint name course becuse(/api/v1/course",courseRouter)
// /api/v1/course/course  do bar ho jayega so that i only put "/" I don't want to put any extra
adminRouter.post("/course", (req, res) => {
    res.json({
        message: ""
    })

})
//admin can change the course name so used put 
adminRouter.put("/course", (req, res) => {
    res.json({
        message: ""
    })

})

// to get all the courses
adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: ""
    })

})

//export 
module.exports ={
    adminRouter:adminRouter

}