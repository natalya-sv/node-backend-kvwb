import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import { getVideos, videosActions } from "../controllers/video.js";

router.get("/videos", isAuth, getVideos);
router.post("/code/videosActions", isAuth, videosActions);
export default router;
