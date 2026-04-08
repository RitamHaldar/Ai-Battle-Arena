import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
}
//# sourceMappingURL=auth.middleware.js.map