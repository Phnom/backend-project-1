const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { InvalidCredentials, TokenExpired, Unauthorized } = require("../errors")

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already exists!",
    },
  },
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

User.beforeCreate((user, options) => {
  user.password = bcrypt.hashSync(user.password, 10)
})

User.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new InvalidCredentials()
  }
  const passwordMatch = bcrypt.compareSync(password, user.password)
  if (passwordMatch) {
    const payload = { id: user.id, name: user.name, email: user.email }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1w" })
  } else {
    throw new InvalidCredentials()
  }
}

User.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpired()
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized()
    } else {
      throw error
    }
  }
}

module.exports = User
