const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.Port || 3000

// Custom routes
const routes = require("./routes")

app.use("/", routes)

app.listen(PORT, () => console.log("Running on port" + PORT))
