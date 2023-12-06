import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import {
  getSocialMedia,
  socialMediaActions,
} from "../controllers/socialMedia.js";

router.get("/social-media", isAuth, getSocialMedia);
router.post("/code/socialMediaActions", isAuth, socialMediaActions);
export default router;
