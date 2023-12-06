import { Schema, model } from "mongoose";

const pushTicketSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    details: {
      type: JSON,
    },
  },
  { timestamps: true }
);
const PushTicket = model("PushTicket", pushTicketSchema);
export { PushTicket };
