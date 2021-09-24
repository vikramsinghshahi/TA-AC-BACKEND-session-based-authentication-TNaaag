var express = require('express');
var router = express.Router();

var User = require("../models/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register", (req, res, next)=>{
  res.render("registrationForm")
})


router.post("/register", (req, res, next)=>{
    User.create( req.body, (err, data)=>{
      if(err) return next(err)
      console.log(data)
    })
})


module.exports = router;
