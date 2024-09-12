const mongoose = require("mongoose");

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
      required: true,
      ref: "User",
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    methods: {
      isCollaborator: function (userId) {
        return this.collaborators.some((collab) => collab.equals(userId));
      },
    },
  }
);

const Drink = mongoose.model("Drink", drinkSchema);

// drinkSchema.methods.isCollaborator =

module.exports = Drink;
