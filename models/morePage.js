import { Schema, model } from "mongoose";

const morePageSchema = new Schema(
  {
    about_us_title: { type: String },
    about_us_content: { type: String },
    mail_notification_content: { type: String },
    mail_notification_link: { type: String },
    privacy_statement_content: { type: String },
    privacy_statement_link: { type: String },
    contact_email: { type: String },
    contact_phone_number: { type: String },
    contact_content: { type: String },
  },
  { timestamps: true }
);

const MorePage = model("MorePage", morePageSchema);
export { MorePage };
