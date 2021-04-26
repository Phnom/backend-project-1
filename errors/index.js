class RecipeError extends Error {}

class InvalidBody extends RecipeError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Ìnvalid Body, require fields: ${this.fields.join(", ")}`
    this.errorCode = 400
  }
}

class InvalidParam extends RecipeError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Ìnvalid Param, require fields: ${this.fields.join(", ")}`
    this.errorCode = 400
  }
}

class InvalidCredentials extends RecipeError {
  constructor() {
    super()
    this.message = `Invalid credentials`
    this.errorCode = 403
  }
}

class TokenExpired extends RecipeError {
  constructor() {
    super()
    this.message = `Token expired, please log in again`
    this.errorCode = 401
  }
}

class Unauthorized extends RecipeError {
  constructor() {
    super()
    this.message = "Unauthorized"
    this.errorCode = 401
  }
}

class NoRecipeError extends RecipeError {
  constructor() {
    super()
    this.message = "Can't find that recipe sir."
  }
}

module.exports = {
  RecipeError,
  InvalidBody,
  InvalidParam,
  Unauthorized,
  InvalidCredentials,
  TokenExpired,
  NoRecipeError,
}
