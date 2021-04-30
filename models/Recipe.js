const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const User = require("./User")
const Ingredient = require("./Ingredient")
const Ingredient_Recipe = require("./Ingredient_Recipe")
const Instruction = require("./Instruction")
const {
  NotYourRecipeError,
  UniqueIngredient,
  NotAIngredientError,
} = require("../errors")
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
  content,
  UserId
) => {
  measure ? (measure = measure) : (measure = null)
  let response = ""
  const isUser = await Recipe.findRecipe(UserId, RecipeId)
  if (!isUser) {
    throw new NotYourRecipeError()
  }
  if (amount && IngredientId) {
    const isIngredient = await Ingredient.findOne({
      where: { id: IngredientId },
    })
    if (!isIngredient) {
      throw new NotAIngredientError()
    }
    try {
      await Ingredient_Recipe.create({
        amount,
        measure,
        IngredientId,
        RecipeId,
      })
    } catch (error) {
      throw new UniqueIngredient()
    }
    response = "Ingredient"
  }
  if (title) {
    await Instruction.create({ title, content, RecipeId })
    amount && IngredientId
      ? (response += " and instruction")
      : (response = "Instruction")
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
