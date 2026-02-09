
const mongoose = require("mongoose")

// i have to give schema of data how it will looks
const Schema = mongoose.Schema

// we have type of user id in form of objextId so we need to import it 
const objextId = mongoose.objectId

// defining user profile here 
// In mongoDb I have stored in user file below info
// and it says what is the structure of data that is goes to the database
const User = new  Schema({
    username:String,
    password:String,
    name :String
})

// Todo schema 
const Todo = new Schema({
    title:String,
    done:Boolean,
    userId:objextId
})

// moongoose.model says " In which collection do you want to put?" eg. linke in user or todo collextion that we have made on moongoDb
//'user this  is the name of data I want to put in (user show in which collection of Moongodb I want to put and) 
//User - It is schema of my model
const UserModel = mongoose.model('user',User)
const TodoModel = mongoose.model('todo',Todo)

//This file(above file) we have to return & need to export so after that in index.js file it get's 
// import so that I can use "model.insert"

// I am exporting the object in that 1st key is userModel and 2nd TodoModel so that I can import this  in index.js
// in index.js i can write const {Usermodel, TodoModel} = require("./database")
//this is the way of import and export in JS

model.exports = {
    UserModel:UserModel,
    TodoModel:TodoModel

}