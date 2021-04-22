const { InvalidBody } = require("../errors")
const User = require("../models/User.js")

class UserController {
  static register = async (req, res, next) => {
    try {
      const { name, password, email } = req.body
      if (!name || !password || !email) {
        throw new InvalidBody(["name", "password", "email"])
      }
      const data = await User.create({ name, password, email })
      res.json({ message: "User registered!" })
    } catch (error) {
      next(error)
    }
  }
  static login = async (req, res, next) => {
    try {
      const { password, email } = req.body
      const token = await User.authenticate(email, password)
      res.json({ token, email })
    } catch (error) {
      next(error)
    }
  }
  static me = (req, res, next) => {
    const { name, email } = req.user

    // vill inte ta req.user?
    res.json({ name, email })
  }
  constructor() {}
}

module.exports = UserController
