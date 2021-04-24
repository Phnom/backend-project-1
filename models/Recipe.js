const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const User = require("./User")

const Recipe = db.define("Recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

// imports user ID
User.hasMany(Recipe)
Recipe.belongsTo(User)

module.exports = Recipe
