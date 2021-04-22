const sqlite = require("sqlite3")
const db = new sqlite.Database("skiss.db")

module.exports = db
