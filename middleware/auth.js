const { Unauthorized } = require("../errors")
const User = require("../models/User")

module.exports = {
  user: (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Unauthorized()
    }
    const token = authorization.replace("Bearer ", "")
    const user = User.validateToken(token)
    req.user = user
    next()
  },
}

// used in routes to auth permission to use controllers
// uses model from User to validateToken
