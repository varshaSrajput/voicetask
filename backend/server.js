import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API running")
})

app.use("/api/tasks", taskRoutes)

const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(port, () => {
      console.log("Server listening on port", port)
    })
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message)
  })
