const { InvalidBody, InvalidParam, NoRecipeError } = require("../errors")
const Ingredient = require("../models/Ingredient")
const Recipe = require("../models/Recipe")
const IngredientItem = require("../models/Ingredient_Recipe")

//const { InvalidBody } = require("../errors")

/// fånga upp undefined från SQL saknas tabbel?

class RecipeController {
  static getAllIngredients = async (req, res, next) => {
    // sökfunktion kvar
    try {
      const data = await Ingredient.findAll()
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
      const UserId = req.user.id
      // utveckla med logiska uttryck för att ta emot ingredienser vid post
      const data = await Recipe.create({ title, UserId })
      res.json({ message: "New recipe created!" })
    } catch (error) {
      next(error)
    }
  }
  static patchRecipe = async (req, res, next) => {
    try {
      const { IngredientId, RecipeId, amount, measure } = req.body
      if (!amount || !measure || !IngredientId || !RecipeId) {
        throw new InvalidBody(["amount"])
      }
      // olika för ID & värden?
      // beskrivningen av receptet?
      // utveckla med logiska uttryck för att ta emot ingredienser vid post
      const data = await IngredientItem.create({
        amount,
        measure,
        IngredientId,
        RecipeId,
      })
      console.log(data)
      // Model find One => rad under recipe no, eller kanske name?
      res.json({ message: `New Ingredient added to recipe no ${RecipeId}!` })
    } catch (error) {
      next(error)
    }
  }
  static deleteRecipe = async (req, res, next) => {
    // kan delete även om recept inte finns?
    // deletar receptet men inte ingredientItem
    try {
      const { id } = req.params
      if (!id) {
        throw new InvalidParam(["id"])
      }
      const UserId = req.user.id
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
      const UserId = req.user.id
      const data = await Recipe.findAll({ where: { UserId } })
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
