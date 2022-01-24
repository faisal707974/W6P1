var express = require('express');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
const { response } = require('../app');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.render('admin',{title: "Admin",admin:true})
  }else{
    res.redirect('/admin/login')
  }
});

module.exports = router;


router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/admin')
  }else{
    res.render('adminlogin')
  }
})

router.post('/adminlogin',(req,res)=>{
  adminHelpers.doAdminLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn =true
      req.session.user = response.user
      res.redirect('/admin')
    }else{
      res.redirect('/admin/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin/login')
})