import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import { sendPushMessage, getReceipts } from "../controllers/pushMessage.js";

router.post("/code/sendPushMessage", isAuth, sendPushMessage);
router.get("/pushInfo/:id", isAuth, getReceipts);
export default router;
