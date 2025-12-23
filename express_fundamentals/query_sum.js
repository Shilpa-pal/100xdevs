const express = require("express")
const app = express()
const port = 3000

app.get("/sum",(req,res)=>{
    const a = req.query.a;
    const b = req.query.b;
    const c = req.query.c;

    res(a + b + '23233')
    
})

app.get("/name_add",(req,res)=>{
    const a = req.query.fname;
    const b = req.query.lname;

    res.json("Hello, " + a + " " + b )
    
});

console.log('Started')
app.listen(port,() =>{
    console.log(`app listening on port ${port}`)
})
