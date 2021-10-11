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

module.exports = router;
