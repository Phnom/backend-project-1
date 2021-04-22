const db = require("../db/sqlite")

class UserModel {
  static models = {
    All: "SELECT * FROM user",
    getBy: {
      name: "SELECT * FROM user WHERE name = ?",
      id: "SELECT * FROM user WHERE id = ?",
    },
    insert: "INSERT INTO user(userName, passwordDigest) VALUES (?, ?)",
  }
  static findAll = async (args) => {
    return new Promise((resolve, reject) => {
      db.all(UserModel.models.All, args, function (err, rows) {
        if (err) return reject(err.message)
        resolve(rows)
      })
    })
  }
  static findOne = async (query, args) => {
    return new Promise((resolve, reject) => {
      db.get(UserModel.models.getBy[query], args, function (err, row) {
        if (err) return reject(err.message)
        resolve(row)
      })
    })
  }
  static createOne = (query, args) => {
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
