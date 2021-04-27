const db = require("../db/connection")
const { DataTypes } = require("sequelize")

const Instruction = db.define("Instruction", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

module.exports = Instruction
