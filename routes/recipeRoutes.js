const { Router } = require("express")
const RecipeController = require("../controllers/recipeController")
const router = Router()

router.get("/ingredients", RecipeController.getAllIngredients)
router.post("/recipes", RecipeController.postRecipe)
router.patch("/recipes/:id", RecipeController.patchRecipe)
router.delete("/recipes/:id", RecipeController.deleteRecipe)
router.get("/recipes", RecipeController.getAllRecipes)
router.get("/recipes/:id", RecipeController.getOneRecipe)

module.exports = router
