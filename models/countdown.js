import { Schema, model } from "mongoose";

const countDownSchema = new Schema(
  {
    event_title: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
  },
  { timestamps: true }
);

const CountDown = model("CountDown", countDownSchema);
export { CountDown };
