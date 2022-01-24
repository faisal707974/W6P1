var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin',{title: "Admin",admin:true})
});

module.exports = router;


router.get('/login',(req,res)=>{
  res.render('adminlogin')
})

router.post('/adminlogin',(req,res)=>{
  let username = 'admin'
  let password = 'admin'
  if(req.body.username===username && req.body.password===password){
    res.redirect('/admin')
  }
  else{
    res.redirect('/admin/login')
  }
})