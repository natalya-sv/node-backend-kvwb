import { Sponsor } from "../models/sponsor.js";
import { updateAppMainData } from "./main.js";

export async function getSponsors(req, res, next) {
  try {
    const fetchedSponsors = await Sponsor.find();
    res.status(200).json({ message: "Sponsors", sponsors: fetchedSponsors });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function sponsorsActions(req, res, next) {
  try {
    const { action, newItem, updatedItem } = req.body;

    let message = "";
    switch (action) {
      case "create":
        const newSponsor = new Sponsor({
          website_url: newItem.website_url,
          sponsor_name: newItem.sponsor_name,
          image_url: newItem.image_url,
          active: newItem.active,
          sponsor_type: newItem.sponsor_type,
        });

        await newSponsor.save();
        message = "Success! Sponsor created";
        break;
      case "update":
        if (req.body.type && req.body.type === "status") {
          const { sponsors, status } = req.body.updatedItem;
          if (sponsors) {
            await Sponsor.updateMany(
              { _id: { $in: sponsors } },
              { $set: { active: status } }
            );
            message = "Sponsors status updated";
          } else {
            throw new Error("Something went wrong. Check input data");
          }
        } else {
          const updatedSponsor = await Sponsor.findById(updatedItem.id);
          if (updatedSponsor) {
            updatedSponsor.website_url = updatedItem.website_url;
            updatedSponsor.sponsor_name = updatedItem.sponsor_name;
            updatedSponsor.image_url = updatedItem.image_url;
            updatedSponsor.sponsor_type = updatedItem.sponsor_type;
            await updatedSponsor.save();
            message = "Success! Sponsor updated";
          }
        }
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await Sponsor.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "Success! Sponsors deleted";
        }
        break;
      default:
        throw new Error("Action not found");
    }
    const dataAction = { action: "sponsors" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating Sponsors" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
