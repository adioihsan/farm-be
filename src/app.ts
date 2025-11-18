import express from "express"
import cors from "cors"
import { errorHandler } from "./middleware/errrorHandler.middleware"
import authRoutes from "./routes/auth.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/v1/auth",authRoutes)

app.use(errorHandler)

app.get("/health-test",(req,res)=>res.json("hello:world"
))

export default app