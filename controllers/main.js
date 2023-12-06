import AppMainData from "../models/appMainData.js";
import { News } from "../models/news.js";
import { SocialMedia } from "../models/socialMedia.js";
import { Video } from "../models/video.js";
import { appMainDataRow } from "../constants.js";
import { Sponsor } from "../models/sponsor.js";
import { Newsletter } from "../models/newsletter.js";
import { ScheduleBook } from "../models/scheduleBook.js";
import { Group } from "../models/group.js";
import { DayProgramme } from "../models/day.js";
import { PhotoFolder } from "../models/photoFolder.js";
import { Album } from "../models/album.js";
import { combineDaysAndGroups, combineFoldersAndAlbums } from "../utils.js";
export async function updateAppMainData(req, data) {
  try {
    const appRow = await AppMainData.findById(appMainDataRow);
    switch (req.action) {
      case "home-page":
        appRow.KVWInfo = data;
        return await appRow.save();
      case "countdown":
        appRow.CountDown = data;
        return await appRow.save();
      case "more-page":
        appRow.MorePage = data;
        return await appRow.save();
      case "news":
        const newNewsObj = {
          title: "Laatste berichten",
          message: "Nog geen nieuws",
          news: [],
        };
        const news = await News.find();
        newNewsObj.news = news;
        appRow.News = newNewsObj;
        return await appRow.save();
      case "newsletters":
        const scheduleBook = await ScheduleBook.find();
        const newNewslettersObj = {
          title: "Verzonden Nieuwsbrieven",
          message: "Nog geen nieuwsbrieven",
          group_books_link: scheduleBook[0]
            ? scheduleBook[0].schedule_book_url
            : "",
          newsletters: [],
        };
        const newsletters = await Newsletter.find();
        newNewslettersObj.newsletters = newsletters;
        appRow.Newsletters = newNewslettersObj;
        return await appRow.save();
      case "sponsors":
        const sponsorsObj = {
          title: "Hoofdsponsoren",
          message: "Sponsoren zijn nog niet bekend",
          sponsors: [],
        };
        const sponsors = await Sponsor.find();
        sponsorsObj.sponsors = sponsors;
        appRow.Sponsors = sponsorsObj;
        return await appRow.save();
      case "social-media":
        const socialMediaObj = {
          title: "Volg ons op Social Media",
          message: "Nog geen accounts",
          accounts: [],
        };
        const accounts = await SocialMedia.find();
        socialMediaObj.accounts = accounts;
        appRow.SocialMedia = socialMediaObj;
        return await appRow.save();
      case "videos":
        const videoObj = {
          title: "Videos",
          message: "Nog geen videos",
          videos: [],
        };
        const videos = await Video.find();
        videoObj.videos = videos;
        appRow.Videos = videoObj;
        return await appRow.save();
      case "schedule":
        const newScheduleObject = {
          title: "Groepen",
          message: "Het rooster is nog niet bekend",
          groups: [],
        };
        const fetchedGroups = await Group.find();
        const fetchedDays = await DayProgramme.find();

        const groups = combineDaysAndGroups(fetchedDays, fetchedGroups);
        newScheduleObject.groups = groups;
        appRow.Schedule = newScheduleObject;
        return await appRow.save();
      case "photos":
        const photosData = {
          title: "Foto's",
          message: "Fotos",
          photo_folders: [],
        };
        const folders = await PhotoFolder.find();
        const albums = await Album.find();
        const photoFolders = combineFoldersAndAlbums(albums, folders);
        photosData.photo_folders = photoFolders;

        appRow.Photos = photosData;
        return await appRow.save();

      default:
        throw new Error("Error updating AppMain Data");
    }
  } catch (err) {
    throw new Error(err);
  }
}
