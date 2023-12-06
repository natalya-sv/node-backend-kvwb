import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    group_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Group = model("Group", groupSchema);
export { Group };
