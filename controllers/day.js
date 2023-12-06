import { updateAppMainData } from "./main.js";
import { DayProgramme } from "../models/day.js";
import { Group } from "../models/group.js";
export async function getDays(req, res, next) {
  try {
    const fetchedDays = await DayProgramme.find();
    res.status(200).json({ message: "Days", days: fetchedDays });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function daysActions(req, res, next) {
  try {
    let message = "";
    const { action, newItem, updatedItem } = req.body;

    switch (action) {
      case "create":
        const { group_id } = newItem;
        const group = await DayProgramme.findById(group_id);
        if (!group) throw new Error("Group not found");

        const newDay = new DayProgramme({
          date: new Date(newItem.date),
          start_time: newItem.start_time,
          end_time: newItem.end_time,
          programma: newItem.programma,
          extra_info: newItem.extra_info,
          start_location: newItem.start_location,
          end_location: newItem.end_location,
          group_id: group_id,
          day_sponsors: newItem.day_sponsors,
        });

        await newDay.save();
        message = "Success! Day created";
        break;
      case "update":
        const { id } = updatedItem;

        const updatedDay = await DayProgramme.findById(id);
        updatedDay.date = new Date(updatedItem.date);
        updatedDay.start_time = updatedItem.start_time;
        updatedDay.end_time = updatedItem.end_time;
        updatedDay.programma = updatedItem.programma;
        updatedDay.extra_info = updatedItem.extra_info;
        updatedDay.end_location = updatedItem.end_location;
        updatedDay.group_id = updatedItem.group_id;
        updatedDay.day_sponsors = updatedItem.day_sponsors;

        await updatedDay.save();
        message = "Success! Day updated";
        break;
      case "delete":
        if (req.body.deletedItems && req.body.deletedItems.length > 0) {
          await DayProgramme.deleteMany({
            _id: { $in: req.body.deletedItems },
          });
          message = "Success! Days deleted";
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
      throw new Error("Error updating Days" + result);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
