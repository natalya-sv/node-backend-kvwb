import { Schema, model } from "mongoose";
import { PushTicket } from "./pushTicket.js";
const pushInfoSchema = new Schema(
  {
    push_title: {
      type: String,
      required: true,
    },
    push_message: {
      type: String,
      required: true,
    },
    expo_tokens: {
      type: [String],
      required: true,
    },
    tickets: [PushTicket.schema],
    receipts: {
      type: [Map],
      required: true,
    },
  },
  { timestamps: true }
);
const PushInfo = model("PushInfo", pushInfoSchema);
export { PushInfo };
