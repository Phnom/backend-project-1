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
    this.message =
      "Unauthorized, Sir I wish I’d thought of your feelings as well."
    this.errorCode = 401
  }
}

class NoRecipeError extends RecipeError {
  constructor() {
    super()
    this.message = "Pardon me, I can't it! I can't find that recipe Sir!"
    this.errorCode = 402
  }
}

class NoWritePermission extends RecipeError {
  constructor() {
    super()
    this.message =
      "You ain't granted permission for that kind of writing exercise Sir!"
    this.errorCode = 404
  }
}

class UniqueName extends RecipeError {
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
class NotYourRecipeError extends RecipeError {
  constructor() {
    super()
    this.message = "That's not your recipe Sir!"
    this.errorCode = 407
  }
}

class NotAIngredientError extends RecipeError {
  constructor() {
    super()
    this.message = "That's not a Ingredient in our system Sir!"
    this.errorCode = 407
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
  NoWritePermission,
  UniqueName,
  UniqueIngredient,
  NotYourRecipeError,
  NotAIngredientError,
}
