
const { Router } = require("router")
const courseRouter = Router()


courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: ""
    })

})

courseRouter.get("/preview", (req, res) => {
    res.json({
        message: ""
    })

})


module.exports = {
    courseRouter: courseRouter
}