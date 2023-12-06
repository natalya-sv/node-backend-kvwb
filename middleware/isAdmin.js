import { User } from "../models/user.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import "dotenv/config.js";

export default async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    decodedToken = verify(token, process.env.SECRET_JWT);
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(decodedToken.userId);

    if (user && user.role === "admin") {
      req.userId = decodedToken.userId;
      next();
    }
    const error = new Error("Permissions denied!");
    error.statusCode = 401;
    throw error;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
