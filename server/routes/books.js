// /routes/books.js
// Michael Adaikalaraj
// 300958145
// Favourite Books


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');


function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
      return res.redirect('/login');
  }
  next();
}

/* GET books List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books,
        displayName: req.user ? req.user.displayName : ""
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add',requireAuth, (req, res, next) => {
    res.render('books/details', { 
      title: 'Add New Book',
      books: '',
      displayName: req.user ? req.user.displayName : ""
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add',requireAuth, (req, res, next) => {

  //new book object
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  //adding book to database
  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });

});


// GET the Book Details page in order to edit an existing Book
router.get('/:id',requireAuth, (req, res, next) => {
  let id = req.params.id;
  book.findById(id, (err, bookObject) => {

      if(err){
          console.log(err);
          res.end(err);
      }
      else{

          res.render('books/details', { 
              title: 'Edit Book',
              books : bookObject,
              displayName: req.user ? req.user.displayName : ""
          });
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id',requireAuth, (req, res, next) => {

  let id = req.params.id;

  let updatedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  //updating a book 
  book.update( {_id:id} , updatedBook, (err, bookObject)=>{
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          res.redirect("/books");
      }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth,(req, res, next) => {
  let id = req.params.id;

  book.remove( {_id:id} , (err, bookObject)=>{
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          res.redirect("/books");
      }
  });
});


module.exports = router;
