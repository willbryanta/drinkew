const express = require('express')
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt')

// Signup form
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up')
});

// Signup form submit
router.post('/sign-up', async (req, res) => {
    const userExists = await User.findOne( { username: req.body.username })

    if( userExists !== null ){
        res.render('auth/sign-up', { errMessage: 'There was an error logging in, did you forget your details?'});
        return;
    }

    if( req.body.password !== req.body.passwordConfirm ){
        res.render('auth/sign-up', { errMessage: `Your passwords don't match`});
        return;
    }

    const hashedPassword = bcrypt.hashSync( req.body.password, 10);
    req.body.password = hashedPassword

    const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
    });

    res.redirect('/')
});

// Login form
router.get('/login', (req, res) => {
    res.render('auth/login')
})

module.exports = router