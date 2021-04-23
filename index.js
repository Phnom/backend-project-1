const express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
require("dotenv").config()
const app = express()

//
const db = require("./db/setup")
//db.sync()
//

app.use(express.json())
app.use(errorHandler)

// Custom routes
const routes = require("./routes")

app.use("/api/v1", routes.userRoutes)

const PORT = process.env.Port || 5000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
