const { nextTick } = require('async')
const BookInstance = require('../models/bookinstance')
const Book = require('../models/book')

const { body, validationResult } = require('express-validator')

// Display list of all BookInstances.
exports.bookinstance_list = (req, res) => {
    BookInstance.find()
    .populate('book')
    .exec((err, result)=>{
        if(err) return nextTick(err)
        res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: result, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : '' })
    })
}

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err, results)=>{
            if(err) return next(err)
            if(results == null){
                let err = new Error('Book copy not found')
                err.status = 404
                return next(err)
            } 
            res.render('bookinstance_detail', {title: 'Copy: ' + results.book.title, bookinstance: results, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
        })     
}

// Display BookInstance create form on GET.
exports.bookinstance_create_get = (req, res) => {
    Book.find({}, "title").exec((err, results) => {
      if (err) return next(err);
      res.render("bookinstance_form", {
        title: "Create BookInstance", book_list: results, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
    })
  }
  
  // Handle BookInstance create on POST.
  exports.bookinstance_create_post = [
    body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
    body("imprint", "Imprint must be specified").trim().isLength({ min: 1 }).escape(),
    body("status").escape(),
    body("due_back", "Invalid date").optional({ checkFalsy: true }).isISO8601().toDate(),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        Book.find({}, "title").exec((err, results) => {
          if (err) return next(err)
          res.render("bookinstance_form", {title: "Create BookInstance", book_list: results, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
        })
      } else {
        let bookinstance = new BookInstance({
          book: req.body.book,
          imprint: req.body.imprint,
          status: req.body.status,
          due_back: req.body.due_back,
        })
        bookinstance.save((err)=>{
          if(err) return next(err)
          res.redirect(bookinstance.url)
        })
      }
    }
  ]

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance delete GET')
}

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST')
}

// Display BookInstance update form on GET.
exports.bookinstance_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET')
}

// Handle bookinstance update on POST.
exports.bookinstance_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST')
}