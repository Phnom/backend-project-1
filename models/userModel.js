const db = require("../db/sqlite")

class UserModel {
  static models = {
    All: "SELECT * FROM users",
    getBy: {
      name: "SELECT * FROM users WHERE name = ?",
      id: "SELECT * FROM users WHERE id = ?",
    },
    insert: "INSERT INTO users(name, passwordDigest) VALUES (?, ?)",
  }
  static findAll = async (args) => {
    return new Promise((resolve, reject) => {
      db.all(UserModel.models.All, args, function (err, rows) {
        if (err) return reject(err.message)
        resolve(rows)
      })
    })
  }
  static findOne = async (args, query) => {
    return new Promise((resolve, reject) => {
      db.get(UserModel.models.getBy[query], args, function (err, row) {
        if (err) return reject(err.message)
        resolve(row)
      })
    })
  }
  static createOne = (args) => {
    return new Promise((resolve, reject) => {
      db.run(UserModel.models.insert, args, function (err) {
        if (err) return reject(err.message)
        resolve(this.lastID)
      })
    })
  }
  constructor() {}
}

module.exports = UserModel
