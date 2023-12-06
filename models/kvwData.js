import { Schema, model } from "mongoose";

const kvwDataSchema = new Schema({
  home_page_title: { type: String, required: true },
  home_page_content: { type: String, required: true },
  image: { type: String, required: false },
  kvw_website: { type: String, required: true },
  thema_title: { type: String, required: true },
  thema_image: { type: String, required: false },
});

const KVWData = model("KVWData", kvwDataSchema);
export { KVWData };
