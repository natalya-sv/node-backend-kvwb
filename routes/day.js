import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import { getDays, daysActions } from "../controllers/day.js";

router.get("/days", isAuth, getDays);
router.post("/code/daysActions", isAuth, daysActions);
export default router;
