import { validationResult } from "express-validator";
import { User } from "../models/user.js";
import { hash, compare } from "bcrypt";

import pkg from "jsonwebtoken";
const { sign } = pkg;
import "dotenv/config.js";

export async function createUser(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, check entered data");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const { email, username, password, role } = req.body;
    const hashedPassword = await hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    const createdUser = await user.save();
    res.status(201).json({ message: "User created", user: createdUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    let loadedUser;
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    loadedUser = user;
    const isEqual = await compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Password is not correct");
      error.statusCode = 404;
      throw error;
    }

    const token = sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.SECRET_JWT,
      { expiresIn: "3 days" }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
