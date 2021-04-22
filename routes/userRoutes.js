const { Router } = require("express")
const UserController = require("../controllers/userController")
const router = Router()
const Auth = require("../middleware/auth")

router.post("/register", UserController.register)
router.post("/auth", UserController.login)
router.get("/me", Auth.user, UserController.me)

module.exports = router
