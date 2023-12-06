import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import { getMorePage, morePageActions } from "../controllers/morePage.js";

router.get("/morePage", isAuth, getMorePage);
router.post("/code/morePageActions", isAuth, morePageActions);
export default router;
