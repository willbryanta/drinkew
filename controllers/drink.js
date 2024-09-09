const express = require('express')
const router = express.Router();

const Drink = require('../models/drink');
const User = require('../models/user');

// RESTFUL CRUD routes

// Create - Show new form
router.get('/new', (req, res) => {
    res.render('drinks/new');
})

// Create - Submit form
router.post('/', async (req, res) => {

    const createdReview = await Drink.create({
        name: req.body.name,
        fizziness: req.body.fizziness,
        flavours: req.body.flavours,
        rating: req.body.rating,
        // owner: req.session.user.id >> undefined
    });

    res.redirect('/drinks');
})

// Read - Show all drinks from database and populate index view
router.get('/', async (req, res) => {
    const drinks = await Drink.find();

    res.render('index', { drinks })
});

// Read - Individual drinks
router.get('/:id', async (req, res) => {
    const drinks = await Drink.findById( req.params.id ).populate('owner')

    res.render('drinks/details', { drinks });
})

// Update - Render edit template
router.get('/:id/edit', async (req, res) => {
    const drinks = await Drink.findById(req.params.id);

    res.render('drinks/edit', { drinks });
})

// Update - put updated drink review
router.put('/:id', async (req, res) => {
    const reviewToUpdate = await Drink.findById( req.params.id )

    await Drink.findOneAndUpdate(
        {_id: req.params.id },
        {
            name: req.body.name,
            fizziness: req.body.fizziness,
            flavours: req.body.flavours,
            rating: req.body.rating,
            collaborators: req.body.collaborators
        },
        {
            new: true
        })

        res.redirect(`/drinks/${ req.params.id }`)
})

router.delete('/:id', async (req, res) => {
    await Drink.deleteOne( req.params.id );

    res.redirect('/drinks');
})

module.exports = router