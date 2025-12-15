//Create a middleware function that logs each incoming request’s HTTP method, URL, 
// and timestamp to the console
const express = require("express")
const app = express()
const port = 3001

function logerMiddleware(req,res,next){
    console.log("method is",req.method)
    console.log("url is",req.url)
    console.log(new Date());
    next()
}
app.use(logerMiddleware)
app.get("/sum",(req, res)=>{
     const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a + b
    })
})
app.get("/minus",(req, res)=>{
     const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
})
console.log("function get called")
app.listen(port, () => {
    console.log(`we sending request on port ${port}`)
})
//search on browser this -http://localhost:3001/sum?a=6&b=8