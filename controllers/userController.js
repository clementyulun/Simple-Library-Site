const User = require('../models/user')
const UserAuth = require('../models/user_auth')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const check_valid_ID_number = (value) => {
  if(value.length == 10){
    let firstCharCode =  value.charCodeAt(0)
    value = value.split('')
    if(firstCharCode >= 65 && firstCharCode <= 90){
      value.splice(0,1)
      let sum = firstCharCode
      value.forEach((e, i) => {
        sum += parseInt(e) * (i+1)
      })
      return sum % 10 == 0 ? true : false
    } 
  }
  return false
}

exports.user_create_post = [
  body('id_number', 'ID number is not valid.').trim().custom((value) => {
    return check_valid_ID_number(value)
  }).escape(),
  body('credential', 'Password must be between 8 to 25 characters.').isLength({min:8, max:25}).escape().custom((value, {req, loc, path}) => {
    if(value === req.body.credential_confirm) return true
  }),
  (req, res, next) => {
    const  errors = validationResult(req).errors
    const id_number = req.body.id_number
    if(errors.length > 0){
      res.render('account_form', {title:'Create User', username_label:'ID Number', credential_label:'Password', credential_confirm_label:'Confirm Password', id_number: id_number, errors: errors})
      return
    }else{
      User.findOne({id_number:id_number}).exec((err, found_user) => {
        if(err) return next(err)
        if(found_user){
          res.render('account_form', {title:'Create User', username_label:'ID Number', credential_label:'Password', credential_confirm_label:'Confirm Password', id_number: id_number, user_exists: true})
        }else{
          let user = new User({
            id_number: id_number
          })
          user.save((err)=>{
            if(err) return next(err, user)

            bcrypt.genSalt(saltRounds, (err, salt) => {
              bcrypt.hash(req.body.credential, salt, function(err, hash) {
                if(err) return next(err)
                
                let userAuth = new UserAuth({
                  auth_type: 'id_number',
                  user_id : user._id,
                  credential: hash
                })
                userAuth.save((err) => {
                  if(err) return next(err)
                })
              })
            })
          })
        }
      })
      res.redirect('../../')
    }
    
  }
]