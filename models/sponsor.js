import { Schema, model } from "mongoose";

const sponsorSchema = new Schema(
  {
    sponsor_name: {
      type: String,
      required: true,
    },
    website_url: {
      type: String,
      required: true,
    },
    sponsor_type: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Sponsor = model("Sponsor", sponsorSchema);
export { Sponsor };
