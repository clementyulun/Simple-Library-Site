const Author = require('../models/author')
const { body, validationResult } = require('express-validator');

// Display list of all Authors.
exports.author_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Author list')
}

// Display detail page for a specific Author.
exports.author_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id)
}

// Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
    res.render('author_form', {title: 'Create Author'})
}

// Handle Author create on POST.
exports.author_create_post = [
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            var author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(function (err) {
                if (err) { return next(err); }
                res.redirect(author.url);
            });
        }
    }
]

// Display Author delete form on GET.
exports.author_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET')
}

// Handle Author delete on POST.
exports.author_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST')
}

// Display Author update form on GET.
exports.author_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET')
}

// Handle Author update on POST.
exports.author_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST')
}