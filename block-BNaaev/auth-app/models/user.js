var mongoose = require("mongoose");

var Schema = mongoose.Schema

var userSchema = new Schema({
    name:{type: String, required:true},
    email:{type:String , required:true, unique:true},
    password:{type:String, min: 5, required: true},
    age:{type: Number, required:true},
    phone:{ type: Number, required:true}
}, {timestamps:true})


module.exports = mongoose.model("User", userSchema)