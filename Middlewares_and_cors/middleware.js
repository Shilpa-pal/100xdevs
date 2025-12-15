const express = require("express")
const app = express()
const port = 3001
let requestCount = 0
function countIncreaser() {
    requestCount = requestCount + 1
    console.log("here is request count number is=", requestCount)
}
function sumhandlers(req, res){

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a + b
    })
}
app.get("/sum",countIncreaser,sumhandlers)

app.get("/multiply", (req, res) => {//http://localhost:3001/multiply?num=6&number=2
    // dont write a & b in query always write  right hand side syntax like num & number
    const x = req.query.num
    const y = req.query.number
    res.json({
        ans: x * y - 2
    })
    countIncreaser() //above I have show ways to write  
})
console.log("function get called")
app.listen(port, () => {
    console.log(`we sending request on port ${port}`)
})
//search on browser this -http://localhost:3001/sum?a=6&b=8