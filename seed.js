const mongoose = require("mongoose");
const dotenv = require("dotenv");
const drinks = require("./models/drink.js");

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
      collaborators: ["66defdfc7fd37330d85f42ce", "66e04a3aa4964fff5a32a82f"],
    },
    {
      name: "Mangorita",
      fizziness: 2,
      flavours: "Mango, Strawberry",
      rating: 9,
      ownerComments: "Tropical",
      collaborators: ["66defdfc7fd37330d85f42ce", "66e04a3aa4964fff5a32a82f"],
    },
    {
      name: "Blue Fruit",
      fizziness: 10,
      flavours: "Blueberry, Watermelon",
      rating: 8,
      ownerComments: "Feels like holiday",
      collaborators: ["66defdfc7fd37330d85f42ce", "66e04a3aa4964fff5a32a82f"],
    },
  ]);
  process.exit(0);
}
