const db = require("./connection")

require("../models/User")
require("../models/Ingredient")
require("../models/Recipe")
require("../models/Ingredient_Recipe")

db.sync()
