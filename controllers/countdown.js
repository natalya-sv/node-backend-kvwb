import { updateAppMainData } from "./main.js";
import { CountDown } from "../models/countdown.js";

export async function getCountDown(req, res, next) {
  try {
    const countdown = await CountDown.find();
    if (countdown) {
      res
        .status(200)
        .json({ message: "Countdown fetched", countdown: countdown[0] });
    } else {
      throw new Error("Countdown not found");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function countdownActions(req, res, next) {
  try {
    const { action, updatedItem } = req.body;
    let message = "";
    switch (action) {
      case "update":
        const countdown = await CountDown.findById(updatedItem.id);
        if (countdown) {
          countdown.event_title = updatedItem.event_title;
          countdown.start_date = new Date(updatedItem.start_date);
          countdown.end_date = new Date(updatedItem.end_date);

          const updatedCountdown = await countdown.save();

          const dataAction = { action: "countdown" };
          const result = await updateAppMainData(dataAction, updatedCountdown);
          message = "Countdown updated!";
          if (result) {
            res.status(201).json({
              message: message,
            });
          } else {
            throw new Error("Error updating Countdown" + result);
          }
        } else {
          throw new Error("Countdown is not found by this id");
        }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
