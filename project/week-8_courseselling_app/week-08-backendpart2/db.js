
const  mongoose  = require("mongoose");
console.log("connected to")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Define the User schema with email, password, firstName, and lastName fields
const userSchema = new Schema({
    email: { type: String, unique: true },// Make email unique to avoid duplicate entries
    password: String,
    firstName: String,
    lastName: String
})

// Define the User schema with email, password, firstName, and lastName fields
const adminSchema =new Schema({
    email: { type: String, unique: true },// Make email unique to avoid duplicate entries
    password: String,
    firstName: String,
    lastName: String

})

// Define the Course schema with title, description, price, imageUrl, and creatorId fields
const courseSchema = new Schema({
    title: String,
    description: String,
    price: String,
    imageUrl: String,
    creatorId: ObjectId/* above both user and admin schema does not have refrances but cousrShema does have refrances 
 if any id above were have the same id would have creatorId:eg 123 if id have adminSchema then likewise courseSchema have 
123 id toowho are creator that person only can make id you can not use nay random id by your own becuse  in place of object id */

})

// Define the Purchase schema with userId and courseId fields
// same rule would follow here too userid going to refer userId and courseId going to refer courseID
const purchaseSchema = new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

// Create models for User, Admin, Course, and Purchase using the respective schemas
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose. model("purchase", purchaseSchema);
const courseModel =  mongoose.model("course", courseSchema);
 
// Export the userModel, adminModel, courseModel, and purchaseModel to be used in other files
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
