const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const User = require("./User")
const Ingredient = require("./Ingredient")
const Ingredient_Recipe = require("./Ingredient_Recipe")
const Instruction = require("./Instruction")
const { UniqueIngredient, NoWritePermission } = require("../errors")
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

// model used to find ALL Recipes created by authorized user
Recipe.findAllRecipes = async (page, pageSize, UserId, pageString) => {
  return await Recipe.findAll({
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
}
// model used to find One Recipes created by authorized user
Recipe.findRecipe = async (UserId, id) => {
  return await Recipe.findOne({
    where: { UserId, id },
    include: [Ingredient, Instruction],
  })
}
// model to check writing permission for a authorized user
Recipe.writePermission = async (UserId, RecipeId) => {
  const isUser = await Recipe.findRecipe(UserId, RecipeId)
  if (!isUser) {
    throw new NoWritePermission("recipe")
  }
}
// model used to patch One Recipes created by authorized user
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
  await Recipe.writePermission(UserId, RecipeId)
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

// Entity Relations for the Recipe and therefor this app.
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

module.exports = Recipe
