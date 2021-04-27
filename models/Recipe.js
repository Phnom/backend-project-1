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

Recipe.findAllRecipes = async (page, pageSize, UserId) => {
  return await Recipe.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where: { UserId },
    include: [Ingredient, Instruction],
  })
}
Recipe.findRecipe = async (UserId, id) => {
  return await Recipe.findOne({
    where: { UserId, id },
    include: [Instruction, Instruction],
  })
}

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

User.hasMany(Recipe, {
  foreignKey: {
    allowNull: false,
  },
})
Recipe.hasMany(Instruction)
Ingredient.belongsToMany(Recipe, { through: Ingredient_Recipe })
Recipe.belongsToMany(Ingredient, { through: Ingredient_Recipe })
Instruction.belongsTo(Recipe, {
  foreignKey: "RecipeId",
})

// lite allow nulls false maybe?

module.exports = Recipe
