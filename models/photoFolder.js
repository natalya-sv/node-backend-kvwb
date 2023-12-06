import { Schema, model } from "mongoose";

const photoFolderSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },
    folder_cover_photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PhotoFolder = model("PhotoFolder", photoFolderSchema);
export { PhotoFolder };
