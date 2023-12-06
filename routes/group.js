import { Router } from "express";
const router = Router();
import isAuth from "../middleware/isAuth.js";
import { getGroups, groupsActions } from "../controllers/group.js";

router.get("/groups", isAuth, getGroups);
router.post("/code/groupsActions", isAuth, groupsActions);
export default router;
