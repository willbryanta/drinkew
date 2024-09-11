const mongoose = require("mongoose");

// Embed list of collaborators
const commentSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  username: {
    type: String,
    required: true,
    ref: "User",
  },
});

const drinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fizziness: Number,
    flavours: String,
    rating: Number,
    ownerComments: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    collaborators: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
