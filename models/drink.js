const mongoose = require('mongoose')

// Embed list of collaborators
const collaboratorSchema = new mongoose.Schema({
    ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    collabUsernames: [{
        type: String,
        required: true,
    }],
    comments: [{
        type: String,
        required: false
    }]
})

const drinkSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    fizziness: Number,
    flavours: String,
    rating: Number,
    ownerComments: String,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [collaboratorSchema]

}, { timestamps: true })

const Drink = mongoose.model('Drink', drinkSchema)

module.exports = Drink