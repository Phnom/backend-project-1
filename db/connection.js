const { Sequelize } = require("sequelize")

const db = new Sequelize({
  dialect: "sqlite",
  storage: "db/skiss.db",
})

module.exports = db
