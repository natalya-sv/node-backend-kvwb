import { updateAppMainData } from "./main.js";
import { SocialMedia } from "../models/socialMedia.js";

export async function getSocialMedia(req, res, next) {
  try {
    const SocialMediaData = await SocialMedia.find();
    res.status(200).json({
      message: "Social media data fetched",
      accounts: SocialMediaData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function socialMediaActions(req, res, next) {
  try {
    let message = "";
    const { action, newItem, updatedItem } = req.body;

    switch (action) {
      case "create":
        const newAccount = new SocialMedia({
          title: newItem.title,
          website_url: newItem.website_url,
          icon_name: newItem.icon_name,
          color: newItem.color,
        });

        await newAccount.save();
        message = "Success! Account created";
        break;
      case "update":
        const { title, website_url, icon_name, color, id } = updatedItem;
        const filter = {
          _id: id,
        };
        const update = {
          title: title,
          website_url: website_url,
          icon_name: icon_name,
          color: color,
        };
        const updatedAccount = await SocialMedia.findOneAndUpdate(
          filter,
          update,
          {
            returnOriginal: false,
          }
        );
        message = "Success! Account updated";
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await SocialMedia.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "Success! Accounts deleted";
        }
        break;
      default:
        break;
    }
    const dataAction = { action: "social-media" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating Accounts" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
