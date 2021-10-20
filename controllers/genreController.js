const { validationResult, body } = require('express-validator');
const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')

// Display list of all Genre.
exports.genre_list = (req, res, next) => {
    Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, result)=>{
        if(err) return next(err)
        res.render('genre_list', {title: 'Genre List', genre_list: result, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
    })
}

// Display detail page for a specific Genre.
exports.genre_detail = (req, res, next) => {
    async.parallel({
        genre: (callback)=>{
            Genre.findById(req.params.id).exec(callback)
        },
        genre_books: (callback)=>{
            Book.find({'genre': req.params.id}).exec(callback)
        }
    },(err, result)=>{
        if(err) return next(err)
        if(result.genre==null){
            let err = 'Genre not found'
            err.status = 404
            return next(err)
        }
        res.render('genre_detail', {title: 'Genre Detail', genre: result.genre, genre_books: result.genre_books, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
    })
}

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', {title: 'Create Genre', user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
}

// Handle Genre create on POST.
exports.genre_create_post = [
    body('name', 'Genre name required').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render('genre_form', {title: 'Create Genre', genre: undefined, errors: errors.array(), user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
            return
        }else{
            Genre.findOne({'name': req.body.name}).exec((err, found_genre)=>{
                if(err){return next(err)}
                if(found_genre){
                    res.redirect(found_genre.url)
                }else{
                    let genre = new Genre(
                        { name: req.body.name }
                    )
                    genre.save((err)=>{
                        if(err){return next(err)}
                        res.redirect(genre.url)
                    })
                }
            })
        }
    }
]

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre delete GET')
}

// Handle Genre delete on POST.
exports.genre_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre delete POST')
}

// Display Genre update form on GET.
exports.genre_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre update GET')
}

// Handle Genre update on POST.
exports.genre_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre update POST')
}