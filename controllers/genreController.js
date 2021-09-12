const { validationResult, body } = require('express-validator');
const Genre = require('../models/genre')

// Display list of all Genre.
exports.genre_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre list')
}

// Display detail page for a specific Genre.
exports.genre_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id)
}

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', {title: 'Create Genre'})
}

// Handle Genre create on POST.
exports.genre_create_post = [
    body('name', 'Genre name required').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req)
        let genre = new Genre(
            { name: req.body.name }
        )
        if(!errors.isEmpty()){
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()})
            return
        }else{
            Genre.findOne({'name': req.body.name}).exec((err, found_genre)=>{
                if(err){return next(err)}
                if(found_genre){
                    res.redirect(found_genre.url)
                }else{
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