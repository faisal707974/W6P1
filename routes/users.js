var express = require('express');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    let user = req.session.user
    res.render('users', { user });
    console.log("not redirected")
  }
  else {
    res.redirect('/login')
    console.log('redirected to login')
  }
});

module.exports = router;


// Get login page

router.get('/login', function (req, res) {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('login')
  }
})

// Get signup page

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response)
    res.redirect('/login')
  })
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })

})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})