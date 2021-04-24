const bcrypt = require("bcryptjs")
const Ingredient = require("../models/Ingredient")
const Recipe = require("../models/Recipe")
const IngredientItem = require("../models/Ingredient_Recipe")

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
  static postRecipe = async (req, res, next) => {
    try {
      const { title } = req.body
      if (!title) {
        throw new InvalidBody(["title"])
      }
      const UserId = req.user.id
      // utveckla med logiska uttryck för att ta emot ingredienser vid post
      const data = await Recipe.create({ title, UserId })
      console.log(data)
      res.json({ message: "New recipe created!" })
    } catch (error) {
      next(error)
    }
  }
  static patchRecipe = (req, res) => {
    console.log("patch recipe")
  }
  static deleteRecipe = (req, res) => {
    console.log("delete recipe")
  }
  static getAllRecipes = async (req, res) => {
    // lägg till by userID
    try {
      const data = await Recipe.findAll()
      res.json({ data })
    } catch (error) {
      next(error)
    }
  }
  static getOneRecipe = async (req, res) => {
    // by userId & param
    console.log("get recipe by id")
  }
  constructor() {}
}

module.exports = RecipeController
