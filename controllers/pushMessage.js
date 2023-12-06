import { PushInfo } from "../models/pushInfo.js";
import { PushTicket } from "../models/pushTicket.js";
export async function sendPushMessage(req, res, next) {
  try {
    const { title, message, tokens } = req.body;

    if (title && message && tokens && tokens.length > 0) {
      const expoRequest = {
        to: tokens,
        badge: 1,
        sound: "default",
        title: title,
        body: message,
      };
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.EXPO_AUTH_TOKEN,
        },
        body: JSON.stringify(expoRequest),
        compress: true,
        size: 0,
      });
      const { data: responseData } = await response.json();

      const pushInfoItem = new PushInfo({
        push_title: title,
        push_message: message,
        expo_tokens: [],
        tickets: [],
        receipts: [],
      });

      if (responseData.errors) {
        throw new Error(
          "Error occured when sending push messages," + responseData.errors
        );
      }
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const slicedToken = token.slice(token.length - 5, token.length - 1);
        const newTicket = new PushTicket({
          name: slicedToken,
          status: responseData[i].status,
          id: responseData[i].id ?? null,
          message: responseData[i].message ?? null,
          details: responseData[i].details ?? null,
        });
        pushInfoItem.tickets.push(newTicket);
      }

      await pushInfoItem.save();

      res.status(200).json({
        message: "Message sent!",
        pushInfoItem,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function getReceipts(req, res, next) {
  try {
    const id = req.params.id;
    const pushInfoItem = await PushInfo.findById(id);
    const tickets = pushInfoItem.tickets.map((ticket) => ticket.id);

    if (pushInfoItem && tickets.length > 0) {
      const result = await fetch(
        "https://exp.host/--/api/v2/push/getReceipts",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: tickets }),
          compress: true,
          size: 0,
        }
      );
      const { data } = await result.json();

      if (data.errors) {
        throw new Error("Error occured when checking tickets," + data.errors);
      }
      let map = new Map();
      for (var value in data) {
        map.set(value, data[value]);
      }
      pushInfoItem.receipts = map;
      await pushInfoItem.save();

      res.status(200).json({
        message: "Tickets retrieved!",
        pushInfoItem,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
