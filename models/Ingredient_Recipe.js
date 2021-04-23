const db = require("../db/connection")
const { DataTypes } = require("sequelize")

const Ingredient_Recipe = db.define("Ingredient_Recipe", {
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  measure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

// import recipeID & ingredientID

module.exports = Ingredient_Recipe
