import { Router } from "express";
import {
  getKVWData,
  updateKVWData,
  kvwActions,
} from "../controllers/kvwData.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();
router.get("/kvw", isAuth, getKVWData);
router.put("/kvw/:id", isAuth, updateKVWData);
router.post("/code/homeActions", isAuth, kvwActions);
export default router;
