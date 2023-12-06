import { updateAppMainData } from "./main.js";
import { Album } from "../models/album.js";

export async function getAlbums(req, res, next) {
  try {
    const albums = await Album.find();
    res.status(200).json({
      message: "Albums fetched",
      albums: albums,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function albumsActions(req, res, next) {
  try {
    let message = "";
    const { action, newItem, updatedItem } = req.body;

    switch (action) {
      case "create":
        const newAlbum = new Album({
          title: newItem.title,
          album_link: newItem.album_link,
          album_cover_photo: newItem.album_cover_photo,
          folder_id: newItem.folder_id,
        });

        await newAlbum.save();
        message = "Success! Album created";
        break;
      case "update":
        const { id } = updatedItem;

        const updatedAlbum = await Album.findById(id);
        updatedAlbum.title = updatedItem.title;
        updatedAlbum.album_link = updatedItem.album_link;
        updatedAlbum.album_cover_photo = updatedItem.album_cover_photo;
        updatedAlbum.folder_id = updatedItem.folder_id;
        await updatedAlbum.save();
        message = "Success! Album updated";
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await Album.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "Success! Albums deleted";
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
      throw new Error("Error updating Albums" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
