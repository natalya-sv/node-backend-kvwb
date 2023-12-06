import { Router } from "express";

import isAuth from "../middleware/isAuth.js";
import { getAlbums, albumsActions } from "../controllers/album.js";
const router = Router();
router.get("/albums", isAuth, getAlbums);
router.post("/code/albumsActions", isAuth, albumsActions);
export default router;
