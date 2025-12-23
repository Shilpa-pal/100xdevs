// import express module using require function and store it in express variable
const express = require('express')
// create an express application using express function
const app = express()
const port = 3000
// create a route for the root URL 
app.get('/', (req, res) => {
  // send a response to the client
  res.send('Hello World!')
})
app.get('/asd', (req, res) => {
  res.send('Hello World from asd')
})
app.get('/test', (req, res) => {
  res.send('Hello World from test')
})

// send a response to the client
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})