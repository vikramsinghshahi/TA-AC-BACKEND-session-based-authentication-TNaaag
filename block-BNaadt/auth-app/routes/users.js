var express = require('express');
const { route } = require('.');
var router = express.Router();

var User = require("../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("index.ejs")
});

router.get("/register", (req, res, next)=>{
  res.render("registrationForm")
})


router.post("/register", (req, res, next)=>{
    User.create( req.body, (err, data)=>{
      if(err) return next(err)
      res.redirect("/users")
    })
})

router.get("/login",(req, res, next)=>{
  res.render("login.ejs")
})

router.post("/login", (req, res, next)=>{
  var{ email, password} = req.body;
 
  if(!email || !password){
    // console.log(email, password)
    return res.redirect("/users/login");
    
  }
  User.findOne({email}, (err, user)=>{
    if(err) return next(err);
    if(!user){
      return res.redirect("/users/login");
    }
    user.verifyPasswords(password, (err, result)=>{
      if(err) return next(err)
      if(!result){
        return res.redirect("/users/login")
      }

      //login user 

      req.session.userId = user.id;
      
      res.redirect("/dashboard")
    })
  })
})




module.exports = router;
