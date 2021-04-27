const { InvalidBody, UniqueName } = require("../errors")
const User = require("../models/User.js")

class UserController {
  static register = async (req, res, next) => {
    try {
      const { name, password, email } = req.body
      if (!name || !password || !email) {
        throw new InvalidBody(["name", "password", "email"])
      }
      const user = await User.findOne({ where: { name } })
      if (user.name === name) {
        throw new UniqueName()
      }
      await User.create({ name, password, email })
      res.json({ message: "User registered!" })
    } catch (error) {
      next(error)
    }
  }
  static login = async (req, res, next) => {
    try {
      const { password, email } = req.body
      if (!password || !email) {
        throw new InvalidBody(["name", "password", "email"])
      }
      const token = await User.authenticate(email, password)
      res.json({ token, email })
    } catch (error) {
      next(error)
    }
  }
  static me = (req, res) => {
    const { name, email } = req.user
    res.json({ name, email })
  }
  constructor() {}
}

module.exports = UserController
