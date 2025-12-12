//import express module using function and store it in express varible
const express = require("express")
// create an express application using express function
const app = express()
const port = 3001

// create a function to calculate the sum of two numbers
function sumOfTwoNumbers(a,b){
    //add a and b & store it in sum varible
    let sum = a +b

     // return the sum of two numbers
    return sum;
}
/**
 * create a route for the root URL to calculate the sum of two numbers
 * 
 * URL - localhost:3000/?a=5&b=10
 */ 

app.get('/',function(req,res){
    // get the value of a & b from the query parameter using req.query object and parse them to integerd using parseInt function
let a = parseInt(req.query.a);
let b = parseInt(req.query.b);
    // call the sumOfTwoNumbers function and pass a and b as arguments to calculate the sum of two numbers and store it in sum variable
    const sum = sumOfTwoNumbers(a,b)

        // send the response to the client with the sum of two numbers
        res.send("sum of " + a + "and" +b+"is"+sum )
})

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})