import { Schema, model } from "mongoose";

const newsletterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    newsletter_link: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Newsletter = model("Newsletter", newsletterSchema);
export { Newsletter };
