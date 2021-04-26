const db = require("../db/connection")
const { DataTypes } = require("sequelize")
const Recipe = require("./Recipe")

const Instruction = db.define("Instruction", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "That title is already taken dude",
    },
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

// import recipeID & ingredientID

Recipe.hasMany(Instruction)
Instruction.belongsTo(Recipe, {
  foreignKey: "RecipeId",
})

module.exports = Instruction
