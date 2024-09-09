const express = require('express')
const router = express.Router();

const Drink = require('../models/drink');
const User = require('../models/user');

// RESTFUL CRUD routes

// New form
router.get('/new', (req, res) => {
    res.render('drinks/new');
})

// Submit form
router.post('/', async (req, res) => {

    const createdReview = await Drink.create({
        name: req.body.name,
        fizziness: req.body.fizziness,
        flavours: req.body.flavours,
        rating: req.body.rating,
        // owner: req.session.user.id >> undefined
    })

    res.redirect('/drinks')
})

// Read all drinks from database and populate index view
router.get('/drinks', async (req, res) => {
    const drinks = await Drink.find();

    res.render('index', { drinks })
});




module.exports = router