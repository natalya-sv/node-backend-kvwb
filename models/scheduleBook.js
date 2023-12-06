import { Schema, model } from "mongoose";

const scheduleBookSchema = new Schema(
  {
    schedule_book_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ScheduleBook = model("ScheduleBook", scheduleBookSchema);
export { ScheduleBook };
