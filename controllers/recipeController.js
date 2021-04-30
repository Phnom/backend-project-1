const {
  InvalidBody,
  InvalidParam,
  NoRecipeError,
  NoWritePermission,
} = require("../errors")
const Recipe = require("../models/Recipe")
const Ingredient = require("../models/Ingredient")

/// fånga upp undefined från SQL saknas tabbel?
function parseQuery(query) {
  const page = +query.page || 1
  let pageSize = +query.pageSize || 10
  const pageString = query.title ? query.title : query.name
  pageSize = pageSize > 10 ? 10 : pageSize
  pageSize = pageSize < 1 ? 1 : pageSize
  return { page, pageSize, pageString }
}

class RecipeController {
  static getAllIngredients = async (req, res, next) => {
    try {
      const { page, pageSize, pageString } = parseQuery(req.query)
      const data = await Recipe.findAllIngredients(page, pageSize, pageString)
      res.json({ data })
    } catch (error) {
      next(error)
    }
  }
  static postRecipe = async (req, res, next) => {
    try {
      const { title, desc } = req.body
      if ((!title, !desc)) {
        throw new InvalidBody(["title"], ["description"])
      }
      const UserId = req.user.id
      await Recipe.create({ title, desc, UserId })
      res.json({ message: "New recipe created!" })
    } catch (error) {
      next(error)
    }
  }
  static patchRecipe = async (req, res, next) => {
    try {
      const { id } = req.params
      const { IngredientId, amount, measure, title, content } = req.body
      if (!id) {
        throw new InvalidBody(["RecipeId"], ["title"], ["amount"])
      }
      const UserId = req.user.id
      // Ingredient already added ? error
      // Recipe.ownership move to patchRecipe
      /*
      const recipe = await Recipe.findRecipe(UserId, id)
      console.log("skurt")
      console.log(recipe.Ingredients[0].dataValues)
      console.log(IngredientId)
      console.log(
        recipe.Ingredients.includes(
          (ingredient) => ingredient.dataValues.id === IngredientId
        )
      )
      */
      if (!recipe) {
        throw new NoWritePermission()
      }
      /* 
      else if (recipe.Ingredients) {
        throw new UniqueIngredient()
      }
      */
      const modelResponse = await Recipe.patchRecipe(
        IngredientId,
        id,
        amount,
        measure,
        title,
        content
      )
      res.json({ message: `${modelResponse} added to recipe no ${id}!` })
    } catch (error) {
      next(error)
    }
  }
  static deleteRecipe = async (req, res, next) => {
    // deletar receptet men inte ingredientItem
    try {
      const { id } = req.params
      if (!id) {
        throw new InvalidParam(["id"])
      }
      const UserId = req.user.id

      // Recipe.ownership Recipe.deleteRecipe(UserId, id)
      const recipe = await Recipe.findRecipe(UserId, id)
      if (!recipe) {
        throw new NoWritePermission()
      }
      const data = await Recipe.destroy({ where: { id, UserId } })
      if (data === 0) {
        throw new NoRecipeError()
      } else {
        res.json({ message: `Recipe no ${id} is deleted!` })
      }
    } catch (error) {
      next(error)
    }
  }
  static getAllRecipes = async (req, res, next) => {
    try {
      const { page, pageSize, pageString } = parseQuery(req.query)
      const UserId = req.user.id
      const data = await Recipe.findAllRecipes(
        page,
        pageSize,
        UserId,
        pageString
      )
      if (data) {
        res.json({ data })
      } else {
        throw new NoRecipeError()
      }
    } catch (error) {
      next(error)
    }
  }
  static getOneRecipe = async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        throw new InvalidParam(["id"])
      }
      const UserId = req.user.id
      const data = await Recipe.findRecipe(UserId, id)
      if (data) {
        res.json({ data })
      } else {
        throw new NoRecipeError()
      }
    } catch (error) {
      next(error)
    }
  }
  constructor() {}
}

module.exports = RecipeController
