const { users } = require("express")
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
    usersRoutes: usersRoutes
}