import { updateAppMainData } from "./main.js";
import { PhotoFolder } from "../models/photoFolder.js";
import { Album } from "../models/album.js";
export async function getPhotoFolders(req, res, next) {
  try {
    const photoFolders = await PhotoFolder.find();
    res.status(200).json({
      message: "Photo Folders fetched",
      photoFolders: photoFolders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function foldersActions(req, res, next) {
  try {
    let message = "";
    const { action, newItem, updatedItem } = req.body;

    switch (action) {
      case "create":
        const newPhotoFolder = new PhotoFolder({
          year: newItem.year,
          folder_cover_photo: newItem.folder_cover_photo,
        });

        await newPhotoFolder.save();
        message = "Success! Photo Folder created";
        break;
      case "update":
        const { id } = updatedItem;

        const updatedPhotoFolder = await PhotoFolder.findById(id);
        updatedPhotoFolder.year = updatedItem.year;
        updatedPhotoFolder.folder_cover_photo = updatedItem.folder_cover_photo;
        await updatedPhotoFolder.save();
        message = "Success! Photo Folder updated";
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await PhotoFolderdeleteMany({
            folder_id: { $in: req.body.deletedItems },
          });
          await Album.deleteMany({
            _id: { $in: req.body.deletedItems },
          });
          message = "Success! Photo Folders deleted";
        }
        break;
      default:
        break;
    }
    const dataAction = { action: "photos" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating Photos" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
