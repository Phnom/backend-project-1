const { Sequelize } = require("sequelize")

const db = new Sequelize({
  dialect: "sqlite",
  storage: "db/GroceryProducts.db",
})

module.exports = db
