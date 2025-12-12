//1.way of writting express 
const express = require("express")
const app = express()
const port = 3000

app.get("/sum",function(req,res){
    const a = req.query.a;
    const b = req.query.b;

    res.json({
     answer:a + b   
    })
})

console.log(`express file listen on port ${port}`)

const express = require("express")
const app1 = express()
const port1 = 3000

//2.way of writting express 
// user need to send data for query /add?a=9&b=0
app1.get("/sum",function(req,res){
    // using parseint to convert string to integer
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
     answer:a + b   
    })

})

app1.get("/multiply",function(req,res){
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        answer:a * b
    })

})
console.log(`express file listen on port ${port1}`)

//3.way of writting express 
const express = require("express")
const app2 = express()
const port2 = 3000

// it is dynamic end point 
app2.get("/add/:a/:b",function(req,res){
    const a = req.params.a;
    const b = req.params.b;

/* user need to add fata for prams is /add/1/2
app2.get("/add/:firstArg/:secondArg",function(req,res){
     const a = req.params.firstArg;
     const b = req.params.secondArg;
    to run above method we need to run (localhost:3000/30/50)
    it give {"answer":80} */

    res.json({
     answer:a + b   
    })
})

console.log(`express file listen on port ${port2}`)