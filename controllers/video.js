import { updateAppMainData } from "./main.js";
import { Video } from "../models/video.js";

export async function getVideos(req, res, next) {
  try {
    const fetchedVideos = await Video.find();
    res.status(200).json({ message: "Videos", videos: fetchedVideos });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function videosActions(req, res, next) {
  try {
    const { action, newItem, updatedItem } = req.body;

    let message = "";
    switch (action) {
      case "create":
        const newVideo = new Video({
          title: newItem.title,
          url: newItem.url,
          description: newItem.description,
          youtube_link: newItem.youtube_link,
          date: new Date(newItem.date),
        });
        await newVideo.save();
        message = "Success! Video created";
        break;
      case "update":
        if (updatedItem) {
          const { title, url, description, youtube_link, date, id } =
            updatedItem;
          const video = await Video.findById(id);
          if (video) {
            video.title = title;
            video.url = url;
            video.description = description;
            video.youtube_link = youtube_link;
            video.date = new Date(date);
            await video.save();
            message = "Video updated!";
          } else {
            throw new Error("Video not found");
          }
        }
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await Video.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "Success! Videos deleted";
        }
        break;
      default:
        throw new Error("Action not found");
    }
    const dataAction = { action: "videos" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating Videos" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
