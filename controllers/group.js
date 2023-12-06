import { updateAppMainData } from "./main.js";
import { Group } from "../models/group.js";

export async function getGroups(req, res, next) {
  try {
    const fetchedGroups = await Group.find();
    res.status(200).json({ message: "Groups", groups: fetchedGroups });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function groupsActions(req, res, next) {
  try {
    let message = "";
    const { action, newItem, updatedItem } = req.body;

    switch (action) {
      case "create":
        const newGroup = new Group({
          group_name: newItem.group_name,
        });

        await newGroup.save();
        message = "Success! Group created";
        break;
      case "update":
        const { group_name, id } = updatedItem;

        const updatedGroup = await Group.findById(id);
        updatedGroup.group_name = group_name;
        await updatedGroup.save();
        message = "Success! Group updated";
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await Group.deleteMany({ _id: { $in: req.body.deletedItems } });
          message = "Success! Groups deleted";
        }
        break;
      default:
        break;
    }
    const dataAction = { action: "schedule" };
    const result = await updateAppMainData(dataAction);
    if (result) {
      res.status(201).json({
        message: message,
      });
    } else {
      throw new Error("Error updating Groups" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
