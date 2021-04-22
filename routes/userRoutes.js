const { Router } = require("express")
const UserController = require("../controllers/userController")
const router = Router()

router.post("/register", UserController.register)
router.post("/auth", UserController.login)
router.get("/me", UserController.me)

module.exports = router
