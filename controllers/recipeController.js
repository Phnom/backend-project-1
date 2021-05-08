const { Op } = require("sequelize")
const Recipe = require("../models/Recipe")
const Ingredient = require("../models/Ingredient")
const {
  InvalidBody,
  InvalidParam,
  NoRecipeError,
  NoIngredientError,
} = require("../errors")
const { parseQuery } = require("../middleware/parseQuery")

module.exports = {
  getAllIngredients: async (req, res, next) => {
    try {
      //Parse and check Query
      const { page, pageSize, pageString } = parseQuery(req.query)
      if (!page || !pageSize || !pageString) {
        throw new InvalidParam(["page", "pageSize", "title or name"])
      }
      //to model data is an Object if not throw error
      const data = await Ingredient.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {
          name: {
            [Op.substring]: pageString,
          },
        },
      })
      if (data) {
        res.json({ data })
      } else {
        throw new NoIngredientError()
      }
    } catch (error) {
      next(error)
    }
  },
  postRecipe: async (req, res, next) => {
    try {
      //Check Body
      const { title, desc } = req.body
      if (!title || !desc) {
        throw new InvalidBody(["title", "description"])
      }
      const UserId = req.user.id
      // to model
      await Recipe.create({ title, desc, UserId })
      res.json({ message: "New recipe created!" })
    } catch (error) {
      next(error)
    }
  },
  patchRecipe: async (req, res, next) => {
    try {
      //Check params
      const { id } = req.params
      if (!id) {
        throw new InvalidParam(["id"])
      }
      //Check body, measure & content is optional
      const { IngredientId, amount, measure, title, content } = req.body
      if (!IngredientId || !amount || !title) {
        throw new InvalidBody(["RecipeId", "amount", "title"])
      }

      const UserId = req.user.id
      //to model => modelResponse is a String
      const modelResponse = await Recipe.patchRecipe(
        IngredientId,
        id,
        amount,
        measure,
        title,
        content,
        UserId
      )
      res.json({ message: `${modelResponse} added to recipe no ${id}!` })
    } catch (error) {
      next(error)
    }
  },
  deleteRecipe: async (req, res, next) => {
    try {
      //Check params
      const { id } = req.params
      if (!id) {
        throw new InvalidParam(["id"])
      }
      const UserId = req.user.id
      //Check permission
      await Recipe.writePermission(UserId, id)

      //Destroy Recipe table if data is 0 there was no Recipe
      const data = await Recipe.destroy({ where: { id, UserId } })
      if (data === 0) {
        throw new NoRecipeError()
      } else {
        res.json({ message: `Recipe no ${id} is deleted!` })
      }
    } catch (error) {
      next(error)
    }
  },
  getAllRecipes: async (req, res, next) => {
    try {
      //Parse and check Query
      const { page, pageSize, pageString } = parseQuery(req.query)
      if (!page || !pageSize || !pageString) {
        throw new InvalidParam(["page", "pageSize", "title or name"])
      }

      const UserId = req.user.id
      //to model data is an Object if not throw error
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
  },
  getOneRecipe: async (req, res, next) => {
    try {
      //Check param
      const { id } = req.params
      if (!id) {
        throw new InvalidParam(["id"])
      }

      const UserId = req.user.id
      //to model data is an Object if not throw error
      const data = await Recipe.findRecipe(UserId, id)
      if (data) {
        res.json({ data })
      } else {
        throw new NoRecipeError()
      }
    } catch (error) {
      next(error)
    }
  },
}
