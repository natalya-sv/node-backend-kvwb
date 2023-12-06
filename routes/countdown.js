import { Router } from "express";
const router = Router();
import { getCountDown, countdownActions } from "../controllers/countdown.js";
import isAuth from "../middleware/isAuth.js";

router.get("/countdown", isAuth, getCountDown);
router.post("/code/countDownActions", isAuth, countdownActions);
export default router;
