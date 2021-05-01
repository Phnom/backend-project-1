const { RecipeError } = require("../errors")
const { BaseError } = require("sequelize")

module.exports = {
  errorHandler: (error, req, res, next) => {
    if (error instanceof RecipeError) {
      res.status(error.errorCode).json({ error: error.message })
    } else if (error instanceof BaseError) {
      res.status(400).json({ error: error.message })
    } else {
      console.error(error)
      res.status(500).json({
        error: "Something went wrong, please contact your system admin",
      })
    }
  },
}

// handles Errors
// this middleWare handles the flow of the errors
// used in Controllers with next
// filename errors/index handles the informations of the errors
