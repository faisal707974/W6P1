var express = require('express');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
const { response } = require('../app');
const collection = require('../config/collection');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
var db = require('../config/connection');
const { deleteUser } = require('../helpers/admin-helpers');


/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    adminHelpers.getAllUsers().then((users) => {
      res.render('admin', { title: "Admin", admin: true, users })
    })
  } else {
    res.redirect('/admin/login')
  }
});

module.exports = router;


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/admin')
  } else {
    res.render('adminlogin')
  }
})

router.post('/adminlogin', (req, res) => {
  adminHelpers.doAdminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/admin')
    } else {
      res.redirect('/admin/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/admin/login')
})

router.get('/addNewUser', (req, res) => {
  res.render('addNewUser')
})

router.post('/addNewUser', (req, res) => {
  console.log(req.body)
  adminHelpers.addUser(req.body, (result) => {
    res.redirect('/admin')
  })
})

router.get('/delete/:id', (req, res) => {
  adminHelpers.deleteUser(req.params.id).then((data) => {
    console.log(data)
      res.redirect('/admin')
  })
})