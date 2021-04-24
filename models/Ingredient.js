const db = require("../db/connection")
const { DataTypes } = require("sequelize")

const Ingredient = db.define("Ingredient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "That name is already taken dude",
    },
  },
})

module.exports = Ingredient
