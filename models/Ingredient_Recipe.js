const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const Recipe = require("./Recipe")
const Ingredient = require("./Ingredient")

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
Ingredient_Recipe.belongsTo(Recipe)
Ingredient_Recipe.hasOne(Ingredient, {
  foreignKey: { IngredientId: "IngredientId" },
})
module.exports = Ingredient_Recipe
