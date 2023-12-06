import { Schema, model } from "mongoose";

const albumSchema = new Schema(
  {
    folder_id: {
      type: Schema.Types.ObjectId,
      ref: "PhotoFolder",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    album_cover_photo: {
      type: String,
      required: true,
    },
    album_link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Album = model("Album", albumSchema);
export { Album };
