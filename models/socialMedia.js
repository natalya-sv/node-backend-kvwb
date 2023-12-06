import { Schema, model } from "mongoose";

const socialMediaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    icon_name: {
      type: String,
      required: true,
    },
    website_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const SocialMedia = model("SocialMedia", socialMediaSchema);
export { SocialMedia };
