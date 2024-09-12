const mongoose = require("mongoose");
const dotenv = require("dotenv");
const drinks = require("./models/drink.js");
const user = require("./models/user.js");

dotenv.config({ path: ".env" });

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected!`);
  seedDrinks();
});

async function seedDrinks() {
  await drinks.deleteMany();

  await drinks.create([
    {
      name: "Coca Cola",
      fizziness: 7,
      flavours: "Strawberry, Pineapple",
      rating: 4,
      ownerComments: "Very strong cola flavour",
      owner: "66df0d68ec6dabd7799b2b8d",
      collaborators: ["66defdfc7fd37330d85f42ce", "66e04a3aa4964fff5a32a82f"],
    },
    {
      name: "Mangorita",
      fizziness: 2,
      flavours: "Mango, Strawberry",
      rating: 9,
      ownerComments: "Tropical",
      owner: "66df0d68ec6dabd7799b2b8d",
      collaborators: ["66defdfc7fd37330d85f42ce", "66e04a3aa4964fff5a32a82f"],
    },
    {
      name: "Blue Fruit",
      fizziness: 10,
      flavours: "Blueberry, Watermelon",
      rating: 8,
      ownerComments: "Feels like holiday",
      owner: "66df0d68ec6dabd7799b2b8d",
      collaborators: ["66defdfc7fd37330d85f42ce", "66e04a3aa4964fff5a32a82f"],
    },
  ]);
  process.exit(0);
}
