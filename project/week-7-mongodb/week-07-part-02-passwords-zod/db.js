const mongoose = require("mongoose")

// I have to give schema of data how it will looks
const Schema = mongoose.Schema

// we have type of userId in form of objectedId so we need to import it
const objectId = mongoose.ObjectId

//defining user profile here 
const User = new Schema({
    email: { type: string, unique: true },
    password: String,
    name: String
})

//Todo schema 
const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: objectId// 
})

// moongoose.model says " In which collection do you want to put?" eg. like in "user" or "todo" collection that we have made on moongoDb
//'user this  is the name of data I want to put in mongoDb data base collection (user show in which collection of Moongodb I want to put and) 
//User - It is schema of my model
const UserModel = mongoose.model('user',User)
const TodoModel = mongoose.model('todo',Todo)

// I am exporting the object in that 1st key is userModel and 2nd TodoModel so that I can import this  in index.js
// in index.js i can write const {Usermodel, TodoModel} = require("./database")
//this is the way of import and export in JS

model.exports = {
    UserModel:UserModel,
    TodoModel:TodoModel
}