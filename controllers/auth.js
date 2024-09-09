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

        res.render('auth/sign-up', { 
            errMessage: 'Your username is already taken',
            username: req.body.username
        });
        return;
    }

    if( req.body.password !== req.body.confirmPassword ){
        res.render('auth/sign-up', { 
            errMessage: `Your passwords don't match`,
            username: req.body.username
        });
        return;
    }

    const hashedPassword = bcrypt.hashSync( req.body.password, 10);
    // req.body.password = hashedPassword

    const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
    });
    await newUser.save()

    res.redirect('/')
});

// Show sign-in form
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in')
})

// Post sign-in form
router.post('/sign-in', (req, res) => {
    const userExists = User.findOne({ username: req.body.username })

    if(userExists === null){
        res.render('auth/sign-in', {
            errMessage: `An account with this username doesn't exist`,
            username: req.body.username
        })
        return;
    }

    if( !bcrypt.compareSync( req.body.password, userExists.password )){
        res.render('auth/sign-in', {
            errMessage: 'Incorrect password. Please try again.',
            username: req.body.username
        })
    }

    req.session.user = {
        username: req.body.username,
        password: req.body.password,
        id: userExists.id
    }

    req.session.save( () => {
        res.redirect('/')
    })
})



module.exports = router