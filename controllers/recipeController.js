const bcrypt = require("bcryptjs")
const Ingredient = require("../models/Ingredient")
const Recipe = require("../models/Recipe")
const RecipeItem = require("../models/Ingredient_Recipe")

//const { InvalidBody } = require("../errors")

class RecipeController {
  static getAllIngredients = async (req, res) => {
    try {
      const data = await Ingredient.findAll()
      res.json({ data })
    } catch (error) {
      next(error)
    }
  }
  static postRecipe = (req, res) => console.log("post recipes")
  static patchRecipe = (req, res) => console.log("patch recipe")
  static deleteRecipe = (req, res) => console.log("delete recipe")
  static getAllRecipes = async (req, res) => {
    try {
      const data = await Recipe.findAll()
      res.json({ data })
    } catch (error) {
      next(error)
    }
  }
  static getOneRecipe = (req, res) => console.log("get recipe by id")
  constructor() {}
}

module.exports = RecipeController
