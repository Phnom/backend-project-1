const { Router } = require("express")
const RecipeController = require("../controllers/recipeController")
const router = Router()
const Auth = require("../middleware/auth")

router.get("/ingredients", Auth.user, RecipeController.getAllIngredients)
router.post("/recipes", Auth.user, RecipeController.postRecipe)
router.patch("/recipes/:id", Auth.user, RecipeController.patchRecipe)
router.delete("/recipes/:id", Auth.user, RecipeController.deleteRecipe)
router.get("/recipes", Auth.user, RecipeController.getAllRecipes)
router.get("/recipes/:id", Auth.user, RecipeController.getOneRecipe)

module.exports = router
