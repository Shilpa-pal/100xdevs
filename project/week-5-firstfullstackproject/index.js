const express = require("express")
const cors = require("cors")
const app = express()

const port = 3000
app.use(express.json());
app.use(cors())
//     domains:["http://google.com","http://employee.google.com"] // you can restrict this too link 


//below code will use when you want to send request on same page like both backened and fronted at same page 
// so for this you have write below code for that you no need to use cors
app.get("/",function(req,res){
    res.sendFile(__dirname + "./public/index.html")
})
app.post("/sum",(req,res)=>{
    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b)
    res.json({
        ans:a+b
    })
})
app.listen(port,()=>{
  
    console.log(`it listen on port ${port}`)
})