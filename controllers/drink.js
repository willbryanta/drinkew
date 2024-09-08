const express = require('express')
const router = express.Router();


const Drink = require('../models/drink')

// RESTFUL CRUD routes


// New form
router.get('/new', (req, res) => {
    res.render('drinks/new');
})



module.exports = router