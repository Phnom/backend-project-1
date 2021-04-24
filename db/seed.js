const db = require("./setup")

const Ingredient = require("../models/Ingredient")

const fs = require("fs")
const text = fs.readFileSync("ingredients.txt").toString().split("\n")

const seed = async (ingredient) => {
  try {
    const data = await Ingredient.create({ name: ingredient })
  } catch (error) {
    console.log("Error, can't seed that one dude")
  }
}

text.forEach((ingredient) => {
  seed(ingredient)
})
