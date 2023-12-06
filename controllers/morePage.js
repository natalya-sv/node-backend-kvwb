import { MorePage } from "../models/morePage.js";
import { updateAppMainData } from "./main.js";

export async function getMorePage(req, res, next) {
  try {
    const fetchedMorePage = await MorePage.find();
    if (fetchedMorePage) {
      res
        .status(200)
        .json({ message: "MorePage fetched", morePage: fetchedMorePage[0] });
    } else {
      throw new Error("More page data not found");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
export async function morePageActions(req, res, next) {
  try {
    const { action, updatedItem } = req.body;
    let message = "";
    switch (action) {
      case "update":
        if (updatedItem) {
          const {
            about_us_title,
            about_us_content,
            mail_notification_content,
            mail_notification_link,
            privacy_statement_content,
            privacy_statement_link,
            contact_email,
            contact_phone_number,
            contact_content,
          } = updatedItem;

          const morePageData = await MorePage.findById(updatedItem.id);
          if (morePageData) {
            morePageData.about_us_title = about_us_title;
            morePageData.about_us_content = about_us_content;
            morePageData.mail_notification_content = mail_notification_content;
            morePageData.mail_notification_link = mail_notification_link;
            morePageData.privacy_statement_content = privacy_statement_content;
            morePageData.privacy_statement_link = privacy_statement_link;
            morePageData.contact_email = contact_email;
            morePageData.contact_phone_number = contact_phone_number;
            morePageData.contact_content = contact_content;

            const updatedMorePage = await morePageData.save();

            const dataAction = { action: "more-page" };
            const result = await updateAppMainData(dataAction, updatedMorePage);
            message = "More Page data updated";
            if (result) {
              res.status(201).json({
                message: message,
              });
            } else {
              throw new Error("Error updating More Page data" + result);
            }
          }
        } else {
          throw new Error("Something went wrong! Check input data");
        }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
