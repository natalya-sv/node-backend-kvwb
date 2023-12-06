import { News } from "../models/news.js";
import { validationResult } from "express-validator";
import { updateAppMainData } from "./main.js";
//req - http request, has props, params,body, http headers
//res - http respose when req was made
//next -callback argument
export async function getNews(req, res, next) {
  try {
    const fetchedNews = await News.find();
    res.status(200).json({ message: "News fetched", news: fetchedNews });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function newsActions(req, res, next) {
  try {
    const { action, newItem } = req.body;
    let message = "";

    switch (action) {
      case "create":
        const nItem = new News({
          title: newItem.newItem.title,
          content: newItem.newItem.content,
          image_url: newItem.newItem.image_url ?? null,
          date: new Date(),
        });
        await nItem.save();
        message = "News created!";
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await News.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "News deleted!";
        }
        break;
      default:
        throw new Error("Action not found");
    }
    const dataAction = { action: "news" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating News" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function createNewsItem(req, res, next) {
  try {
    const { title, content, image_url } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      throw error;
    }
    const newNewsItem = new News({
      title: title,
      content: content,
      image_url: image_url ?? null,
      date: new Date(),
    });

    const result = await newNewsItem.save();
    const dataAction = { action: "news" };
    const resultAppMainData = await updateAppMainData(dataAction);
    if (resultAppMainData) {
      res.status(201).json({
        message: "Created",
      });
    } else {
      throw new Error("Error updating News" + result);
    }
    if (result) {
      res.status(201).json({
        message: "News item created!",
        newsItem: newNewsItem,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function updateNewsItem(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, check entered data");
      error.statusCode = 422;
      throw error;
    }
    const newsItemId = req.params.id;
    const { title, content, image_url } = req.body;
    const newsItem = await findById(newsItemId);
    if (!newsItem) {
      const error = new Error("Newsitem not found");
      error.statusCode = 404;
      throw error;
    }

    newsItem.title = title;
    newsItem.content = content;
    newsItem.image_url = image_url ?? null;
    const updatedNewsItem = await newsItem.save();

    res.status(200).json({
      message: "News item updated!",
      updatedNewsItem: updatedNewsItem,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function deleteNewsItem(req, res, next) {
  try {
    const newsItemId = req.params.id;
    const newsItem = await findById(newsItemId);
    if (!newsItem) {
      const error = new Error("Newsitem not found");
      error.statusCode = 404;
      throw error;
    }

    await findByIdAndRemove(newsItemId);
    res.status(200).json({ message: "News item deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function deleteManyNews(req, res, next) {
  try {
    const { ids } = req.body;
    if (ids && ids.length > 0) {
      await deleteMany({ _id: { $in: ids } });
    } else {
      await deleteMany();
    }
    res.status(200).json({ message: "News items deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
