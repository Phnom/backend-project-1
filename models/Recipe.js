const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const User = require("./User")
const Ingredient = require("./Ingredient")
const Ingredient_Recipe = require("./Ingredient_Recipe")
const Instruction = require("./Instruction")

const Recipe = db.define("Recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Recipe.patchRecipe = async (
  IngredientId,
  RecipeId,
  amount,
  measure,
  title,
  content
) => {
  let response = ""
  if (amount) {
    await Ingredient_Recipe.create({ amount, measure, IngredientId, RecipeId })
    response = "Ingredient"
  }
  if (title) {
    await Instruction.create({ title, content, RecipeId })
    amount ? (response += " and instruction") : (response = "Instruction")
  }
  return response
}

User.hasMany(Recipe)
Recipe.hasMany(Instruction)
Ingredient.belongsToMany(Recipe, { through: Ingredient_Recipe })
Instruction.belongsTo(Recipe, {
  foreignKey: "RecipeId",
})

module.exports = Recipe
