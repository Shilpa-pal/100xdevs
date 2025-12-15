
const express = require("express")
const app = express()
// total number of requesst 
let requestcount = 0
function requestIncreaser() {
    requestcount = requestcount + 1

    app.get("sum", function (req, res) {
        requestIncreaser()
        //main logic
        const a = parseInt(req.query.a)
        const b = parseInt(req.query.b)

        res.json({
            ans: a + b
        })
    })
    app.get("sum", function (req, res) {
        requestIncreaser()
        //main logic
        const a = parseInt(req.query.a)
        const b = parseInt(req.query.b)

        res.json({
            ans: a + b
        })
    })
}
app.listen(3000)


