const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const User = require("./User")
const Ingredient = require("./Ingredient")
const Ingredient_Recipe = require("./Ingredient_Recipe")
const Instruction = require("./Instruction")

const { Op } = require("sequelize")

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

Recipe.findAllIngredients = async (page, pageSize, pageString) => {
  return await Ingredient.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where: {
      name: {
        [Op.substring]: pageString,
      },
    },
  })
}

Recipe.findAllRecipes = async (page, pageSize, UserId, pageString) => {
  const data = await Recipe.findAll({
    where: {
      UserId,
      title: {
        [Op.substring]: pageString,
      },
    },
    include: [Ingredient, Instruction],
    limit: pageSize,
    offset: (page - 1) * pageSize,
  })

  return data
}
Recipe.findRecipe = async (UserId, id) => {
  return await Recipe.findOne({
    where: { UserId, id },
    include: [Ingredient, Instruction],
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
