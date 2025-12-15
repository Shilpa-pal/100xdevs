// we can write this also 
const express = require("express")
const app = express()
// total number of requesst 
let requestcount = 0

function requestIncreaser(req, res, next) {
    requestcount = requestcount + 1
    console.log("Total number of request= ", requestcount)
    next()
    /*if you use (next()) the below function will run if not then it won't run
    we can write like below inplace of next()
     res.json({
         message:"I ended the request"
     })
     you should call any one between above either you can use next() and res.json
     & you can give condition allso
      if(){
     res.json({
         message:"I ended the request"
     })
} else {
    next()
}
    */
}

function realSumHandler(req, res) {
    //main logic
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    res.json({
        ans: a + b
    })
}
// better , routing ,add databse , middleswared 

// if you don't want to work on below you can write 
app.get("/admin",realSumHandler)

/* app.get("/sum", requestIncreaser, realSumHandler)// you dont need to use 
requestincease to every line you can made this on global 
like this if i write app.use it will apply to all below routes
app.use(requestIncreaser) is middleware which will used by app below route 
but above admin not use middleswares */
app.use(requestIncreaser)

app.get("/sum",  realSumHandler)
app.get("/multiply",realSumHandler)

app.get("/divide",realSumHandler)

app.listen(3000)