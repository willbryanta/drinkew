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

    try{
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
    } catch (err){
        console.log(err)

        res.status(500).render('errors/500')
    }
});

// Show sign-in form
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in')
})

// Post sign-in form
router.post('/sign-in', async (req, res) => {
    try {
    const userExists = await User.findOne({ username: req.body.username })

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
        return;
    }

    req.session.user = {
        username: req.body.username,
        password: req.body.password,
        id: userExists.id
    }

    req.session.save( () => {
        res.redirect('/')
    })
    } catch (err){
        res.status(500).render('errors/500')
    }
})

// Sign-out
router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router