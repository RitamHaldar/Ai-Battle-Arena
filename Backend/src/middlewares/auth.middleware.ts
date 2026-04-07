import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export async function authMiddleware(req: any, res: any, next: any) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
}