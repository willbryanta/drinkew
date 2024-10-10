const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Drink = require("../models/drink");
const User = require("../models/user");

// RESTFUL CRUD routes

// Create - Show new form
router.get("/new", (req, res) => {
  res.render("drinks/new");
});

// Create - Submit form
router.post("/", async (req, res) => {
  try {
    // Parsing list of collaborators from form
    let doAllCollabsExist = true;
    const collaboratorsObjArr = [];

    if (req.body.collaborators) {
      const submitCollaborators = req.body.collaborators;
      const collaboratorsSubmitArr = submitCollaborators
        .split(", ")
        .map((collab) => collab.trim());

      // Check whether the collaborator for the created drink exists in the database as a user
      for (const formCollab of collaboratorsSubmitArr) {
        const user = await User.findOne({ username: formCollab });

        if (user) {
          collaboratorsObjArr.push(user.username);
        } else {
          doAllCollabsExist = false;
          return res.render("drinks/new", {
            errMessage: `Unfortunately one or more of the collaborators you've entered do not have an account.`,
          });
        }
      }
    }

    if (doAllCollabsExist) {
      await Drink.create({
        name: req.body.name,
        fizziness: req.body.fizziness,
        flavours: req.body.flavours,
        rating: req.body.rating,
        owner: req.session.user.id,
        ownerComments: req.body.ownerComments,
        collaborators: collaboratorsObjArr,
      });
    }

    res.redirect("/drinks");
  } catch (err) {
    res.status(500).render("errors/500.ejs", {
      errMessage:
        "There was an error trying to process your request. Please try again later.",
    });
  }
});

// Read - Show all drinks from database and populate index view
router.get("/", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.render("index", { drinks });
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/myReviews", async (req, res) => {
  const drinks = await Drink.find({ owner: req.session.user.id });

  res.render("profile", { drinks: drinks });
});

// Read - Individual drinks
router.get("/:id", async (req, res) => {
  const drink = await Drink.findById(req.params.id).populate("owner");

  console.log(drink);

  res.render("drinks/details", { drink });
});

// Update - Render edit template
router.get("/:id/edit", async (req, res) => {
  const drink = await Drink.findById(req.params.id).populate("owner");

  res.render("drinks/edit", { drink });
});

// Update - put updated drink review
router.put("/:id", async (req, res) => {
  try {
    const reviewToUpdate = await Drink.findById(req.params.id);

    // Parsing list of collaborators from form
    let doAllCollabsExist = true;
    const collaboratorsObjArr = [];

    if (req.body.collaborators) {
      const submitCollaborators = req.body.collaborators;
      const collaboratorsSubmitArr = submitCollaborators
        .split(", ")
        .map((collab) => collab.trim());

      // Check whether the collaborator for the created drink exists in the database as a user
      for (const formCollab of collaboratorsSubmitArr) {
        const user = await User.findOne({ username: formCollab });

        if (user) {
          collaboratorsObjArr.push(user._id);
        } else {
          doAllCollabsExist = false;
          return res.render("drinks/new", {
            errMessage: `Unfortunately one or more of the collaborators you've entered do not have an account.`,
          });
        }
      }
    }

    await Drink.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        fizziness: req.body.fizziness,
        flavours: req.body.flavours,
        rating: req.body.rating,
        owner: req.body.owner,
        ownerComments: req.body.ownerComments,
        collaborators: collaboratorsObjArr,
      },
      {
        new: true,
      }
    );

    res.redirect(`/drinks/${req.params.id}/?collaborators=collaboratorsObjArr`);
  } catch (err) {
    res.status(400).render("errors/400.ejs");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Drink.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).render("errors/404");
    }

    res.redirect("/drinks");
  } catch (err) {
    res.status(500).render("errors/500.ejs", {
      errMessage:
        "There was an error trying to process your request. Please try again later.",
    });
  }
});

module.exports = router;
