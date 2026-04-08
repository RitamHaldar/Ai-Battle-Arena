import express from "express";
import chatRouter from "./routes/chat.routes.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://ai-battle-arena-pgv8.onrender.com",
    credentials: true
}));
app.use("/api/chat", chatRouter);
app.use("/api/auth", authRouter);
app.use(express.static("./Public"));
export default app;
//# sourceMappingURL=app.js.map