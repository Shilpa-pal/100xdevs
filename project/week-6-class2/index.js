const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "Shilpa123"
const app = express()
const port = 3000

// used middleware to parse a data
app.use(express.json())
const users =[]

// we need to intoduced 3 end point
app.post("/signup",(req,res)=>{
    const username = req.body.username // if we are using req.body we should use middleware 
    const password = req.body.password
    users.push({
        username:username,
        password:password
    })
    res.json({
        message:" you are signed in"
    })

})
app.post("/signin",(req,res)=>{
    const username = req.body.username // if we are using req.body we should use middleware 
    const password = req.body.password
    
    // we have to check is this username and password is correct
    // we righting a code to check is the user exist in global array ([])
    let founduser = null
    for(let i =0;i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
            // we have found the user in past and storing in founduser varible
            founduser = users[i]
        }
        // if founduser does't exist you should return back th messsage
        if(!founduser){
            res.json({
                message:" Credentials incorrect"
            })
            return
            //when user does exist then return users back to token
        }else{
            // how we return back to token?
            //  what we need to do when user sigin? we should return back the token.
            // so how can we create a token ?
            // so I had said we use JWt  library to cretae a token.
            const token = jwt.sign({
                username// we don't need to send password 
            },JWT_SECRET)
            res.json({
                token:token
            })
        }
    }   
})
//whenerve i get on /me end point it give me information of about me and my courses and my todo etc.
app.get("/me",(req,res)=>{
    //first we have take token from headers
    const token = req.headers.token;
    //if anyone wants to hit authenticated point
    // what is authenticated point?
    //ans:- where we need to have token you have to signin then only we can access
    //they need to send token on headers token we can take as cookie it depends on us what you want to keep
    
    //we have to verify this token
    const decodedData = jwt.verify(token,JWT_SECRET)
    //const decodedData = jwt.decode(token) // we can use this also instead of jwt.verifying but it have vulnerability it might get  login by anyone
    
    //if user indeed log in
    if(decodedData.username){
        //we want our username and password
         let founduser = null
    for(let i =0;i<users.length;i++){
        if(users[i].username == decodedData.username){
            // we have found the user in past and storing in founduser varible
            founduser = users[i]  
    }
}
res.json({
    username:founduser.username,
    password:founduser.password
})

}
})
app.listen(port,()=>{
    console.log(`It listen on port ${port}`)
})
