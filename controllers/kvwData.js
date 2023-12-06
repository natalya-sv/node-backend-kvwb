import { KVWData } from "../models/kvwData.js";
import { validationResult } from "express-validator";
import { updateAppMainData } from "./main.js";

export async function getKVWData(req, res, next) {
  try {
    const fetchedKVWData = await KVWData.find();
    res
      .status(200)
      .json({ message: "KVWData fetched", home: fetchedKVWData[0] });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function updateKVWData(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, check entered data");
      error.statusCode = 422;
      throw error;
    }
    const id = req.params.id;

    const kvwData = await KVWData.findById(id);
    const {
      home_page_title,
      home_page_content,
      image,
      thema_title,
      thema_image,
    } = req.body;

    if (!kvwData) {
      const error = new Error("KVWdata not found");
      error.statusCode = 404;
      throw error;
    }

    kvwData.home_page_title = home_page_title;
    kvwData.home_page_content = home_page_content;
    kvwData.image = image;
    kvwData.thema_title = thema_title;
    kvwData.thema_image = thema_image;
    const updatedKVWData = await kvwData.save();
    res
      .status(200)
      .json({ message: "Data updated", updatedKVWData: updatedKVWData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export async function kvwActions(req, res, next) {
  try {
    const { action, updatedItem } = req.body;
    let message = "";
    switch (action) {
      case "update":
        const kvwData = await KVWData.findById(updatedItem.id);
        if (kvwData) {
          const {
            home_page_title,
            home_page_content,
            image,
            thema_title,
            thema_image,
          } = updatedItem;
          kvwData.home_page_title = home_page_title;
          kvwData.home_page_content = home_page_content;
          kvwData.image = image;
          kvwData.thema_title = thema_title;
          kvwData.thema_image = thema_image;
          const updatedKVWData = await kvwData.save();

          const dataAction = { action: "home-page" };
          const result = await updateAppMainData(dataAction, updatedKVWData);
          message = "KVW data updated";
          if (result) {
            res.status(201).json({
              message: message,
            });
          } else {
            throw new Error("Error updating KVW data" + result);
          }
        } else {
          throw new Error("KVWData is not found by this id");
        }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
