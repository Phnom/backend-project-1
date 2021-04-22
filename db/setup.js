const db = require("./connection")
require("../models/User")

db.sync()
