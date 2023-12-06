import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import { getPhotoFolders, foldersActions } from "../controllers/photoFolder.js";

router.get("/folders", isAuth, getPhotoFolders);
router.post("/code/foldersActions", isAuth, foldersActions);
export default router;
