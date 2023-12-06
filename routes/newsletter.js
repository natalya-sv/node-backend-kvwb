import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import {
  getNewsletters,
  newslettersActions,
} from "../controllers/newsletter.js";

router.get("/newsletters", isAuth, getNewsletters);
router.post("/code/newslettersActions", isAuth, newslettersActions);
export default router;
