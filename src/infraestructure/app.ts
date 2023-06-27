import "dotenv/config";
import express from "express";
import cors from "cors";
import dbInit from "./db/mongo";
import routeUser from "./route/user.route";
import routeLocation from "./route/location.route";
import routeComment from "./route/comment.route";
import routePublication from "./route/publication.route";
import routeActivity from "./route/activity.route";
import routeApplication from "./route/application.route";
import routeRatings from "./route/ratings.route";
import {
  deleteLocalFileUser,
  uploadUser,
} from "./controller/multer/userMulter.ctrl";
import {
  deleteLocalFilePublication,
  uploadPublication,
} from "./controller/multer/publicationMulter.ctrl";
import http from "http";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "./utils/logger";
import socket from "./chat/server";

const porto=3000;
const host="147.83.7.158"
const corsOrigin = "*";
const app = express();
const appo=express();
const httpServer = createServer(appo);
app.use(cors());
app.use(express.json());

/*const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

createSocketServer(io);*/
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});
const port = process.env.PORT || 3001;

//app.use(uploadUser.single("photoUser"),routeUser,deleteLocalFileUser as express.RequestHandler);
app.use(uploadUser.single("photoUser"), routeUser);
app.use(routeLocation);
app.use(routeComment);
app.use(routeRatings);
app.use(
  uploadPublication.single("photoPublication"),
  routePublication,
  deleteLocalFilePublication as express.RequestHandler
);
app.use(routeActivity);
app.use(routeApplication);

dbInit().then(() => console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`Ready on port ${port}`));
httpServer.listen(9876, () => {
  console.log(`http://147.83.7.158:9876`);
  socket({ io });
});