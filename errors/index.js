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
    this.message = `Invalid credentials Sir!`
    this.errorCode = 403
  }
}

class TokenExpired extends RecipeError {
  constructor() {
    super()
    this.message = `Token expired, please login again Sir!`
    this.errorCode = 401
  }
}

class Unauthorized extends RecipeError {
  constructor() {
    super()
    this.message = "Unauthorized, Maybe better luck next time Sir!."
    this.errorCode = 401
  }
}

class NoRecipeError extends RecipeError {
  constructor() {
    super()
    this.message = "Sorry, I can't find that recipe Sir!"
    this.errorCode = 402
  }
}

class NoIngredientError extends RecipeError {
  constructor() {
    super()
    this.message =
      "Oops, Something went wrong Sir. I'm so, so sorry, but I can't find that Ingredient. Take a cup of tea and it everything will feel alright, trust me."
    this.errorCode = 42
  }
}

class NoWritePermission extends RecipeError {
  constructor(item) {
    super()
    this.message = `That's not your ${item} Sir! You ain't granted permission for that kind of writing exercise.`
    this.errorCode = 404
  }
}

class UniqueNameError extends RecipeError {
  constructor() {
    super()
    this.message = "That name is already taken Sir!"
    this.errorCode = 405
  }
}
class UniqueIngredient extends RecipeError {
  constructor() {
    super()
    this.message = "We already got that ingredient in our recipe Sir!"
    this.errorCode = 405
  }
}

module.exports = {
  RecipeError,
  InvalidBody,
  InvalidParam,
  InvalidCredentials,
  Unauthorized,
  NoWritePermission,
  NoIngredientError,
  NoRecipeError,
  TokenExpired,
  UniqueNameError,
  UniqueIngredient,
}
