const db = require("../db/connection")
const { DataTypes } = require("sequelize")

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

module.exports = Recipe
