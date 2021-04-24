const bcrypt = require("bcryptjs")
const Ingredient = require("../models/Ingredient")

//const { InvalidBody } = require("../errors")

class RecipeController {
  static getAllIngredients = (req, res) => console.log("ingredients")
  static postRecipe = (req, res) => console.log("post recipes")
  static patchRecipe = (req, res) => console.log("patch recipe")
  static deleteRecipe = (req, res) => console.log("delete recipe")
  static getAllRecipes = (req, res) => console.log("get all recipes")
  static getOneRecipe = (req, res) => console.log("get recipe by id")
  constructor() {}
}

module.exports = RecipeController
