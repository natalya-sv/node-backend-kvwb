import express from "express";
import pkg from "body-parser";
import { connect } from "mongoose";
import homeRoutes from "./routes/kvwData.js";
import newsRoutes from "./routes/news.js";
import userRoutes from "./routes/user.js";
import appMainDataRoute from "./routes/appMainData.js";
import sponsorsRoutes from "./routes/sponsor.js";
import countdownRoutes from "./routes/countdown.js";
import morePageRoutes from "./routes/morePage.js";
import socialMediaRoutes from "./routes/socialMedia.js";
import videoRoutes from "./routes/video.js";
import newslettersRoutes from "./routes/newsletter.js";
import groupRoutes from "./routes/group.js";
import dayRoutes from "./routes/day.js";
import albumRoutes from "./routes/album.js";
import photoFolderRoutes from "./routes/photoFolder.js";
import pushMessageRoutes from "./routes/pushMessage.js";
import "dotenv/config.js";
const app = express();
const { json } = pkg;

app.use(json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(homeRoutes);
app.use(newsRoutes);
app.use(userRoutes);
app.use(appMainDataRoute);
app.use(sponsorsRoutes);
app.use(countdownRoutes);
app.use(morePageRoutes);
app.use(socialMediaRoutes);
app.use(videoRoutes);
app.use(newslettersRoutes);
app.use(groupRoutes);
app.use(dayRoutes);
app.use(albumRoutes);
app.use(photoFolderRoutes);
app.use(pushMessageRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log("err:", error);
  res.status(status).json({ message: message, data: data });
});

connect(process.env.MONGODB_URI)
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log("err db conncetion", err);
  });
