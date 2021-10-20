const User = require('../models/user')
const UserAuth = require('../models/user_auth')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField : 'id_number',
    passwordField: 'credential'
  }, 
  (id_number, credential, done) => {
    User.findOne({id_number: id_number}).then((user)=>{
      if(!user){
        return done(null, false, {message: 'User not exists'})
      }

      let user_credential
      UserAuth.findOne({user_id: user._id}).then((user_auth) => {
        user_credential = user_auth.credential
        bcrypt.compare(credential, user_credential, (err, isMatch)=>{
          if(isMatch) return done(null, user)
          else return done(null, false)
        })
      })
    })
  }
))

passport.serializeUser((user, done)=>{
  done(null, user._id)
})

passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    done(err, user)
  })
})


const check_valid_ID_number = (value) => {
  if(value.length == 10){
    let firstCharCode =  value.charCodeAt(0)
    value = value.split('')
    if(firstCharCode >= 65 && firstCharCode <= 90){
      value.splice(0,1)
      value=[...firstCharCode.toString(),...value]
      let weight = [1,9,8,7,6,5,4,3,2,1,1]
      let sum = 0
      weight.forEach((e, i)=>{
        sum += e*value[i]
      })
      return sum % 10 == 0 ? true : false
    } 
  }
  return false
}

exports.user_create_post = [
  body('id_number', 'ID number is not valid.').trim().custom((value) => {return check_valid_ID_number(value)}).escape(),
  body('credential', 'Password must be between 8 to 25 characters.').isLength({min:8, max:25}).escape()
  .custom((value, {req, loc, path}) => {if(value === req.body.credential_confirm) return true}).withMessage('Passwords not match.'),
  (req, res, next) => {
    const  errors = validationResult(req).errors
    const id_number = req.body.id_number
    if(errors.length > 0){
      res.render('account_form', {title:'Create User', username_label:'ID Number', credential_label:'Password', credential_confirm_label:'Confirm Password', id_number: id_number, errors: errors, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
      return
    }else{
      User.findOne({id_number:id_number}).exec((err, found_user) => {
        if(err) return next(err)
        if(found_user){
          res.render('account_form', {title:'Create User', username_label:'ID Number', credential_label:'Password', credential_confirm_label:'Confirm Password', id_number: id_number, user_exists: true, user: req.user ? (req.user.nickname==='' ? req.user.nickname : 'New User') : ''})
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

exports.user_login_post = [
  passport.authenticate('local', {
    failureRedirect:'/user/login',  
    failureFlash: 'Invalid username or password',
    successRedirect: '/catalog'
  })
]

exports.user_info_get = (req, res) => {
  res.send('user_info_get NOT IMPLEMENTED')
}

exports.user_info_post = (req, res) => {
  res.send('user_info_post NOT IMPLEMENTED')
}

exports.user_logout = (req, res) => {
  req.logout()
  res.redirect('/')
}