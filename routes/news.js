import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import {
  getNews,
  createNewsItem,
  updateNewsItem,
  deleteNewsItem,
  deleteManyNews,
  newsActions,
} from "../controllers/news.js";

router.get("/news", isAuth, getNews);
router.post("/news", isAuth, createNewsItem);
router.put("/news/:id", isAuth, updateNewsItem);
router.delete("/news/:id", isAuth, deleteNewsItem);
router.delete("/news", isAuth, deleteManyNews);
router.post("/code/newsActions", isAuth, newsActions);
export default router;
