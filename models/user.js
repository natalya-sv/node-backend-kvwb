import { Schema, model } from "mongoose";
const { userRole } = "../constants.js";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export { User };
