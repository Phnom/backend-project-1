const User = require("../models/User.js")
const { InvalidBody, UniqueNameError } = require("../errors")

module.exports = {
  register: async (req, res, next) => {
    try {
      // Check body
      const { name, password, email } = req.body
      if (!name || !password || !email) {
        throw new InvalidBody(["name", "password", "email"])
      }
      // Check if User exists
      const user = await User.findOne({ where: { name } })
      if (user) {
        throw new UniqueNameError()
      }
      // Create User
      await User.create({ name, password, email })
      res.json({ message: "User registered!" })
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      // Check body
      const { password, email } = req.body
      if (!password || !email) {
        throw new InvalidBody(["name", "password", "email"])
      }
      // to model => token is needed in headers (authorization) to use recipeController
      // please read middleWare auth
      const token = await User.authenticate(email, password)
      res.json({ token, email })
    } catch (error) {
      next(error)
    }
  },
  me: (req, res) => {
    // No Check needed, handled by middleWare auth
    const { name, email } = req.user
    res.json({ name, email })
  },
}
