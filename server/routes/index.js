// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});


/* GET - displays the Login Page */
router.get('/login', (req, res, next)=>{
if(!req.user){
  res.render('auth/login', {
    title: 'Home',
    books: ''
   });
}else{
  return res.redirect("/");
}
});

/* POST - processes the Login Page */
router.post('/login', (req, res, next)=>{
  
});

/* GET - displays the User Registration Page */
router.get('/register', (req, res, next)=>{
  
});

/* POST - processes the User Registration Page */
router.post('/register', (req, res, next)=>{
  
});

/* GET - perform user logout */
router.get('/logout', (req, res, next)=>{
  
});


module.exports = router;
