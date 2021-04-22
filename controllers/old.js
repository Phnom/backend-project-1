const bcrypt = require("bcryptjs")

//const { InvalidBody } = require("../errors")

class RecipeController {
  static postUser = (req, res, next) => {
    try {
      const { name, password } = req.body
      console.log(name + bcrypt.hashSync(password, 10))
    } catch (error) {
      next(error)
    }
  }
  static loginUser = (req, res, next) => {
    try {
      const { name, password } = req // const token = await authenticate

      //res.json({ token, email })
    } catch (error) {
      next(error)
    }
  }
  static authUser = (req, res) => console.log("auth")
  static getAllIngredients = (req, res) => console.log("ingredients")
  static postRecipe = (req, res) => console.log("post recipes")
  static patchRecipe = (req, res) => console.log("patch recipe")
  static deleteRecipe = (req, res) => console.log("delete recipe")
  static getAllRecipes = (req, res) => console.log("get all recipes")
  static getOneRecipe = (req, res) => console.log("get recipe by id")
  constructor() {}
}

// dela upp i user och recipe

module.exports = RecipeController
