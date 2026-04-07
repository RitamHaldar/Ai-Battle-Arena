import { Router } from "express";
import { registerUser, loginUser, getUser } from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-me", authMiddleware, getUser);
export default router;