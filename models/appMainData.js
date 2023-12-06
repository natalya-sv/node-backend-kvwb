import { Schema, model } from "mongoose";
import { News } from "./news.js";
import { CountDown } from "./countdown.js";
import { KVWData } from "./kvwData.js";
import { Sponsor } from "./sponsor.js";
import { Video } from "./video.js";
import { SocialMedia } from "./socialMedia.js";
import { MorePage } from "./morePage.js";
import { Newsletter } from "./newsletter.js";
const appMainData = new Schema(
  {
    News: {
      title: { type: String },
      message: { type: String },
      news: { type: [News.news] },
    },
    Photos: {
      title: { type: String },
      message: { type: String },
      photo_folders: [],
    },
    Schedule: {
      title: { type: String },
      message: { type: String },
      groups: [],
    },
    CountDown: CountDown.schema,
    KVWInfo: KVWData.schema,
    Sponsors: {
      title: { type: String },
      message: { type: String },
      sponsors: [Sponsor.schema],
    },
    Videos: {
      title: { type: String },
      message: { type: String },
      videos: [Video.schema],
    },
    SocialMedia: {
      title: { type: String },
      message: { type: String },
      accounts: [SocialMedia.schema],
    },
    MorePage: MorePage.schema,
    Newsletters: {
      title: { type: String },
      message: { type: String },
      group_books_link: { type: String },
      newsletters: [Newsletter.schema],
    },
  },
  { timestamps: true }
);

export default model("AppMainData", appMainData);
