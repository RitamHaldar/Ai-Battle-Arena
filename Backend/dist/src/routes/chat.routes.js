import { Router } from "express";
import { chatResponse } from "../controller/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const chatRouter = Router();
chatRouter.post("/", authMiddleware, chatResponse);
export default chatRouter;
//# sourceMappingURL=chat.routes.js.map