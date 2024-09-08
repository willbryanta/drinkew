const mongoose = require('mongoose')

const collaboratorSchema = new mongoose.Schema({
    ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    names: [{
        type: String,
        required: true,
    }]
})

const drinkSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    fizziness: Number,
    flavours: [String],
    rating: Number,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [collaboratorSchema]

}, { timestamps: true })

const Drink = mongoose.model('Drink', drinkSchema)

module.exports = Drink