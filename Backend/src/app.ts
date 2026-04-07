import express from "express"
import chatRouter from "./routes/chat.routes.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/chat", chatRouter)
app.use("/api/auth", authRouter)

export default app