const { nextTick } = require('async')
const bookinstance = require('../models/bookinstance')
const BookInstance = require('../models/bookinstance')

// Display list of all BookInstances.
exports.bookinstance_list = (req, res) => {
    BookInstance.find()
    .populate('book')
    .exec((err, result)=>{
        if(err) return nextTick(err)
        res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: result })
    })
}

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = (req, res) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err, results)=>{
            if(err) return next(err)
            if(results == null){
                let err = new Error('Book copy not found')
                err.status = 404
                return next(err)
            } 
            res.render('bookinstance_detail', {title: 'Copy: ' + results.book.title, bookinstance: results})
        })     
}

// Display BookInstance create form on GET.
exports.bookinstance_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET')
}

// Handle BookInstance create on POST.
exports.bookinstance_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST')
}

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