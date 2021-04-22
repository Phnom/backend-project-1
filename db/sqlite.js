const sqlite = require("sqlite3")
const db = new sqlite.Database("GenGrocery.db")

module.exports = db
