import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import taskRoutes from "./routes/task.js"
import Task from "./models/Task.js"
import { tasks } from "./data/data.js"

//Configurations
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use("/task", taskRoutes)


// Mongoose Setup
const PORT = process.env.PORT || 9000
mongoose.set("strictQuery", true)
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))

        // Add seed data to the database once
        // Task.insertMany(tasks)

    })
    .catch((error) => console.log(`${error} did not connect.`))