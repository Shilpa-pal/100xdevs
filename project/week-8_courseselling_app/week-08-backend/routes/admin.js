
const { Router } = require("express")
const adminRouter = Router()


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
module.export ={
    adminRouter:adminRouter

}