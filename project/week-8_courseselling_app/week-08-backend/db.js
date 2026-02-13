
const  mongoose  = require("mongoose");
mongoose.connect("")
const Schema = mongoose.Schema;
const ObjectId = mongoose.type.ObjectId;


const userSchema = Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});
const adminSchema = Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String

})
const courseSchema = Schema({,
    title: String,
    description: String,
    price: String,
    imageUrl: String,
    creatorId: ObjectId

})
const purchaseSchema = Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const userModel = Mongoose.Model("user", userSchema);
const adminModel = Mongoose.Model("admin", adminSchema);
const purchaseModel = Mongoose.Model("purchase", purchaseSchema);
const courseModel = Mongoose.Model("course", courseSchema);


//export 
module.export = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
