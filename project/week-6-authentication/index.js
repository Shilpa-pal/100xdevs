
const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();

const port = 3001
app.use(express.json());
const JWT_SECRET = "shilpailovemyhusband"
/*
we need to used middleware becuse whithout it we won't get access of request body.
what is request body ?
when we go at postman whatever I send( via method post ) through body like(username,password,sumvalue a=8,b=9)
I'll not able to get access the username or password over here  below code until I use app.use(express.json()) middleware
this app.use(express.json()) help to parse any post body that comes below 
example..  app.post("/signin",(req,res)=>{
    const body = req.body
})*/


const users = [] //we store all the data over here username ,password

/*remember jab tak res.json not written tab tak post man won't show anything it will just "bush around the corner"
  app.post("/signup",(req,res)=>{
    res.json({
        message: "you have signup "
    })
})*/
app.post("/signup",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
/*/if you wnat to strict how username and password should get store so you can write like below conditions
if(username.length<5){
    res.json({
        message:" your username is very small"

    })
}*/

// for now we want to keep condition the user data won't get store twise in array
// same user details dubra na chala jaye
if(users.find(u=>u.username === username)){
    res.json({
        message:"You are already signedup"
    })
    return 
}
// it will store dat ain empty array
    users.push({
        username:username,
        password:password
    })
      res.json({
        message: "you have signed un "
    })
    console.log(users)
})

app.post("/signin",function(req,res){
      const username = req.body.username
    const password = req.body.password

    // two ways to write this logic here is  1st 
    let founduser = null // below code just finding out whose men is he of username and password
    for(let i =0;i<users.length;i++){
        if(users[i].username == username && users[i].password == password )
        founduser = users[i]
    }
    /* this using find function that is similar to map and filter
    const findusers = users.find((u)=>{
        if(u.username == username && u.password == password){
            return true ;
        }else{
            return false
        }
    })*/

// this founduser is inmemory varible of that user
/*;//convert username over to a jwt it is function signature of jwt.sign() it tales 2 arguments 
        //argument 1: wha do you want to code encrypt but in our case jsut user name
        //what is your secrete that you sign to specific for,& create encode this token encrypt.this will generate a token  so now you dont need to store this token inmemory anymore  ,becuse jwt  
        //token is itself store it's state so i do not need to store it in(founduser.token = token)
        //becuse it's  token itsele have all information bucoz my username encoded in token
if user  gets found(below code mean) */ 
    if(founduser){
        const token = jwt.sign({
            //I convert this username to takon using my JWT_SECRET
            username:username
        },JWT_SECRET)
        


        //founduser.token = token;// it means I am not just stored global users ={[username:"shilpa",password:123,token:"absfgdngmdgdfjkdd"]}
        //but also stored token: added that i have genrated
        //we add this (token:"absfgdngmdgdfjkdd") because server wants to know "ye token kiska hai" that's why we stored it global varibleelse
        res.json({ // we return this token to the user " ye raha tumhara token keep it and every subsquwnt send it to me  "
            message:token
        })
    }else{
        res.status(403).send({
            message:"invalid username or password"
        })
    }
    console.log(users)
})
//it helps to get back user info to user for that U need to selecte in postman in headers section you can give name to token or authorization and 
//paste token which you get after signin
console.log("ABOUT TO REGISTER /me"); // this line written to know below route's working or not 
app.get("/me",function(req,res){
    console.log(" /me route hit")
    const token =req.headers.token // it checks token correct or not 
    //note: just we have converted username to jwt by usinh jwt.sign()
    //likewise below lin we conveting jwt to usercode by uding jwt.verify()sort of decode
    const decodedInfromation = jwt.verify(token,JWT_SECRET)// we get back this line of varible like {username:"shilpapal1721@gmail.com"}
    const username = decodedInfromation.username
    let founduser = null;
    for(let i=0;i<users.length;i++){
        if(users[i].username == username){
            founduser = users[i]
        }
    }
    // if user is found it return the info
    if(founduser){
        res.json({
            username:founduser.username,
            password:founduser.password
        })
    }else{// if not it will retrun a mesage
        res.json({
            message:"token invalid"
        })
    }

})
//It ensure that http server is listening on port 3000
app.listen(port,()=>{
    console.log(`It listen on port ${port}`)
});

/* what is end to end flow for full stack application  backened website
when browser send request of signup to fb (backened)
fb response  you bake you have signup
then  you send request to signin
then it  returns you back token 
when you sent anysubsquent (when you get some information of your and your course,)you send this tken along
*/