const express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(errorHandler)

const routes = require("./routes")

// Custom routes
app.use("/api/v1", routes.userRoutes)
app.use("/api/v1", routes.recipeRoutes)

const PORT = process.env.Port || 5000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
