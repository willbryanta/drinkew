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
        // Parsing list of collaborators from form
        let doAllCollabsExist = false;
        const submitCollaborators = req.body.collaborators
        const collaboratorsArr = submitCollaborators.split(', ').map(collab => collab.trim());
        const collaboratorObjArr = [];
    
        // Check whether the collaborator for the created drink exists in the database as a user
        for(const formCollab of collaboratorsArr){
            const user = await User.findOne({ username: formCollab })

            if(user){
                collaboratorObjArr.push({
                    id: user._id,
                    collabUsername: formCollab,
                    comments: user.comments
                })
            } else {
                doAllCollabsExist = false;
                return res.render('drinks/new', { errMessage: `Unfortunately one or more of the collaborators you've entered do not have an account.`})
            }
        }

    if(doAllCollabsExist){
    await Drink.create({
        name: req.body.name,
        fizziness: req.body.fizziness,
        flavours: req.body.flavours,
        rating: req.body.rating,
        owner: req.session.user.id,
        collaborators: collaboratorObjArr
    });

    res.redirect('/drinks');
    }
})

// Read - Show all drinks from database and populate index view
router.get('/', async (req, res) => {
    const drinks = await Drink.find();

    res.render('index', { drinks })
});

// Read - Individual drinks
router.get('/:id', async (req, res) => {
    const drinks = await Drink.findById( req.params.id ).populate('owner')

    console.log(drinks)
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
            ownerComments: req.body.ownerComments,
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

router.get('/profile', (req, res) => {
    const drinks = Drink.findById( req.session.id ).populate('owner')


});

module.exports = router