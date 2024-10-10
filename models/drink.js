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
    // Collaborators have edit permissions for drinks but cannot delete the review to which they are a collaborator
    // Creators of the review can access all write functionality
    collaborators: [
      {
        type: String,
        ref: "User",
        required: false,
      },
    ],
  },
  {
    timestamps: true,

    // Methods used for conditional rendering when showing/hiding edit UI based on whether users are collaborators or owners
    methods: {
      isCollaborator: function (userId) {
        return this.collaborators.some((collab) => collab.equals(userId));
      },
      isOwner: function (userId) {
        return this.owner._id.equals(userId);
      },
      canBeEditedBy: function (userId) {
        return this.isOwner(userId) || this.isCollaborator(userId);
      },
    },
  }
);

const Drink = mongoose.model("Drink", drinkSchema);

// drinkSchema.methods.isCollaborator =

module.exports = Drink;
