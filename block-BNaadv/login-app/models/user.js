var mongoose = require("mongoose")

var bcrypt = require("bcrypt")
var Schema = mongoose.Schema

var userSchema = new Schema({
    name:{ type: String, required:true},
    email:{type:String, required:true , unique:true},
    password:{type:String, required:true, minlength:5}
})


userSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
      bcrypt.hash(this.password, 10, (err, hashed) => {
        if (err) return next(err);
        this.password = hashed;
        next();
      });
    } else {
      next();
    }
  });

  userSchema.methods.verifyPasswords = function(password, cb){
    bcrypt.compare(password, this.password, (err, result)=>{
      return cb(err, result)
  
    })
  }  

module.exports = mongoose.model("User", userSchema)