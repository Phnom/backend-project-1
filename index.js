const express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
const app = express()
require("dotenv").config()
const PORT = process.env.Port || 5000

app.use(express.json())
app.use(errorHandler)

// Custom routes
const routes = require("./routes")

app.use("/api/v1", routes.userRoutes)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
