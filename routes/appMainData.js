import { Router } from "express";
const router = Router();
import { getAppMainData } from "../controllers/appMainData.js";

router.get("/appMainData", getAppMainData);

export default router;
