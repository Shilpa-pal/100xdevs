
const express = require("express")
const app = express()
const port = 3000

// in express when you need to send some JSON data 
//you need to parse some data
//if you know you are going to pass express data then you have to use app.use(express.json)
// if we don't use app.use(express.json) then  req.body.a will be undefined
app.use(express.json)
app.post("/sum",(req,res)=>{
    const a = req.body.a
    const b = req.body.b
    res.json({
        ans:a +b
    })
})
app.listen(port,()=>{
    console.log(`it listen on port ${port}`)
})