const db = require("./connection")

require("../models/Ingredient")
require("../models/Recipe")
require("../models/Instruction")
require("../models/Ingredient_Recipe")
require("../models/User")

db.sync()
