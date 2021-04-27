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
  pageSize = pageSize > 10 ? 10 : pageSize
  pageSize = pageSize < 1 ? 1 : pageSize
  return { page, pageSize }
}

class RecipeController {
  static getAllIngredients = async (req, res, next) => {
    const { page, pageSize } = parseQuery(req.query)
    // sökfunktion kvar
    try {
      const data = await Ingredient.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
      })
      res.json({ data })
    } catch (error) {
      next(error)
    }
  }
  static postRecipe = async (req, res, next) => {
    try {
      const { title } = req.body
      if (!title) {
        throw new InvalidBody(["title"])
      }
      // lägg till desc
      const UserId = req.user.id
      await Recipe.create({ title, UserId })
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

      // Recipe.ownership
      const recipe = await Recipe.findOne({ where: { id, UserId } })
      if (!recipe) {
        throw new NoWritePermission()
      }
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

      // Recipe.ownership
      const recipe = await Recipe.findOne({ where: { id, UserId } })
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
    const { page, pageSize } = parseQuery(req.query)
    // ta emot namn, parse query lite annorlunda.
    // filter eller includes ? efte find all på query skicka ny data med json
    try {
      const UserId = req.user.id
      const data = await Recipe.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: { UserId },
      })
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
      const data = await Recipe.findOne({ where: { UserId, id } })
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
