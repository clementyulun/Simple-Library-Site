const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.get('/create', (req, res, next)=>{
  res.render('account_form', {title:'Create User', username_label:'ID Number', credential_label:'Password', credential_confirm_label:'Confirm Password'})
})

router.post('/create', user_controller.user_create_post)

router.get('/login', (req, res, next)=>{
  res.render('account_form', {title:'Login', username_label:'ID Number', credential_label:'Password', credential_confirm_label:'Confirm Password', login_mode:true})
})

router.post('/login', user_controller.user_login_post)

router.get('/info', user_controller.user_info_get)

router.post('/info', user_controller.user_info_post)

router.get('/logout', user_controller.user_logout)

module.exports = router;
