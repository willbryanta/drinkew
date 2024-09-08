const mongoose = require('mongoose')

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
    }

}, { timestamps: true })

const Drink = mongoose.model('Drink', drinkSchema)

module.exports = Drink