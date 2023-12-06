import { Router } from "express";
const router = Router();
import { createUser, login } from "../controllers/user.js";
import { body } from "express-validator";
import { User } from "../models/user.js";
import isAdmin from "../middleware/isAdmin.js";

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().not().isEmpty(),
  ],
  isAdmin,
  createUser
);

router.post("/login", login);

export default router;
