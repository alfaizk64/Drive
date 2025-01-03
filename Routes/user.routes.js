const express = require('express');
const { register_user, register_page, index_page, login_page, login_user, home_page, logout_user } = require('../Controllers/user.controller');
const router = express.Router();
const { body } = require('express-validator');
const loginauth = require('../middlewares/loginAuth');

// router.get('/',index_page)

router.get('/register',register_page)
router.post('/register-user', 
     body("email").trim().isEmail().isLength({min:13}),
     body("password").trim().isLength({min:8}),
     body("username").trim().isLength({min:3})
    ,register_user)


router.get('/login',loginauth,login_page)
router.post('/login-user',
    
    body("email").trim().isEmail().isLength({min:13}),
    body("password").trim().isLength({min:8}),
    login_user)

router.post('/logout',logout_user)

module.exports = router;