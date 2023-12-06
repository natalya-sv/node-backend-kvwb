import { updateAppMainData } from "./main.js";
import { Newsletter } from "../models/newsletter.js";
export async function getNewsletters(req, res, next) {
  try {
    const fetchedNewsletters = await Newsletter.find();
    res
      .status(200)
      .json({ message: "Newsletters", videos: fetchedNewsletters });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function newslettersActions(req, res, next) {
  try {
    const { action, newItem, updatedItem } = req.body;

    let message = "";
    switch (action) {
      case "create":
        const newNewsletter = new Newsletter({
          title: newItem.title,
          newsletter_link: newItem.newsletter_link,
          date: new Date(newItem.date),
        });
        await newNewsletter.save();
        message = "Success! Newsletter created";
        break;
      case "update":
        if (updatedItem) {
          const { title, newsletter_link, id, date } = updatedItem;
          const newsletter = await Newsletter.findById(id);
          if (newsletter) {
            newsletter.title = title;
            newsletter.newsletter_link = newsletter_link;
            newsletter.date = new Date(date);
            await newsletter.save();
            message = "Newsletter updated!";
          } else {
            throw new Error("Newsletter not found");
          }
        }
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await Newsletter.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "Success! Newsletters deleted";
        }
        break;
      default:
        throw new Error("Action not found");
    }
    const dataAction = { action: "newsletters" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating Newsletters" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
