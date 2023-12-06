import { appMainDataRow } from "../constants.js";
import AppMainData from "../models/appMainData.js";

export async function getAppMainData(req, res, next) {
  try {
    const fetchedAppMainData = await AppMainData.findById(appMainDataRow);
    res
      .status(200)
      .json({ message: "Success", appMainData: fetchedAppMainData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
