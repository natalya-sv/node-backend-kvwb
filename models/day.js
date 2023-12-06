import { Schema, model } from "mongoose";

const daySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    programma: {
      type: String,
      required: true,
    },
    extra_info: {
      type: String,
      required: true,
    },
    start_location: {
      type: String,
      required: true,
    },
    end_location: {
      type: String,
      required: true,
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    day_sponsors: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
const DayProgramme = model("DayProgramme", daySchema);
export { DayProgramme };
