var express = require('express');
const { route } = require('.');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index.ejs');
});

router.get('/register', (req, res, next) => {
  res.render('registrationForm', { error: req.flash('error')[0] });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, data) => {
    if (err) {
      if (err.code === 11000) {
        req.flash('error', 'This email is taken');
        return res.redirect('/users/register');
      }
      if (err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('/users/register');
      }
      return res.json({ err });
    }

    res.redirect('/users');
  });
});

router.get('/login', (req, res, next) => {
  res.render('login.ejs', { error: req.flash('error')[0] });
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;

  if (!email || !password) {
    req.flash('error', 'Email/password is required');
    // console.log(email, password)
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'This email is not register');
      return res.redirect('/users/login');
    }
    user.verifyPasswords(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Incorrect Password');
        return res.redirect('/users/login');
      }

      //login user

      req.session.userId = user.id;

      res.redirect('/dashboard');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  // res.clearCookie("connect.Sid")
  res.redirect('/users/login');
});

module.exports = router;
