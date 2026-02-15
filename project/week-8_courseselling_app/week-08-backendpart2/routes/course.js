
const { Router } = require("express")
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


// Export the courseRouter so that it can be used in other files
module.exports = {
    courseRouter: courseRouter
}
/*
instead of this method we witten like above it reduce redundant
function createUserRoutes() {
    app.get("/course/preview", function (req, res) {
        // you would expect the user to pay money to purchase a course

        res.json({
            message: "Priview endpoint!",
        });
    });

    app.get("/courses", function (req, res) {
        res.json({
            message: "Pourses endpoint!",
        });
    });
    module.exports = {
    createUserRoutes: createUserRoutes,
};
}*/
