const bcrypt = require("bcryptjs")
const UserModel = require("../models/userModel")
const { InvalidBody } = require("../errors")

class UserController {
  static register = async (req, res, next) => {
    try {
      const { name, password } = req.body
      if (!name || !password) {
        throw new InvalidBody(["name", "password"])
      }
      // to Model
      const data = await UserModel.createOne([
        name,
        bcrypt.hashSync(password, 10),
      ])
      res.json({ message: "User registered!" })
    } catch (error) {
      next(error)
    }
  }
  static login = (req, res, next) => {
    try {
      const { name, password } = req
      // auth from Model
      // const token = await authenticate
      if (!name || !password) {
        throw new InvalidBody(["title", "content"])
      }
      // res.json({ token, email })
      res.json({ message: "token" })
    } catch (error) {
      next(error)
    }
  }
  static me = (req, res) => {
    const { name } = req.user
    res.json({ message: "name" })
  }
  constructor() {}
}

module.exports = UserController
