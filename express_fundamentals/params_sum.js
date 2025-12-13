const express = require("express")
const app = express()
const port  = 3001

app.get("/multiply/:firstArg/:secondArg",(req,res)=>{
    const x = req.params.firstArg
    const y = req.params.secondArg

    res.json({
        sol:x * y
    })
});

//  run on server using this http://localhost:3001/multiply/7/8
app.listen(port,()=>{
    console.log(`listen on port ${port}`)
})