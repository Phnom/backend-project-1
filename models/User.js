const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { InvalidCredentials, TokenExpired, Unauthorized } = require("../errors")

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "That name is already taken dude",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = User
