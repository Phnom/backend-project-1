const { Router } = require("express")
const RecipeController = require("../controllers/index.js")
const router = Router()

router.post("/register", RecipeController.postUser)
router.post("/auth", RecipeController.authUser)

router.get("/ingredients", RecipeController.getAllIngredients)
router.post("/recipes", RecipeController.postRecipe)
router.patch("/recipes/:id", RecipeController.patchRecipe)
router.delete("/recipes/:id", RecipeController.deleteRecipe)
router.get("/recipes", RecipeController.getAllRecipes)
router.get("/recipes/:id", RecipeController.getOneRecipe)

module.exports = router
