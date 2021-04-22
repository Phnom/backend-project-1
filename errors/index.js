class RecipeError extends Error {}

class InvalidBody extends RecipeError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Ìnvalid Body, require fields: ${this.fields.join(", ")}`
    this.errorCode = 400
  }
}

module.exports = {
  RecipeError,
  InvalidBody,
}
