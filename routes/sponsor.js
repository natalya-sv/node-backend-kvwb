import { Router } from "express";
const router = Router();
import { getSponsors, sponsorsActions } from "../controllers/sponsor.js";
import isAuth from "../middleware/isAuth.js";

router.get("/sponsors", isAuth, getSponsors);
router.post("/code/sponsorsActions", isAuth, sponsorsActions);
export default router;
