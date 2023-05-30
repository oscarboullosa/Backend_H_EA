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
import {
  deleteLocalFileUser,
  uploadUser,
} from "./controller/multer/userMulter.ctrl";
import {
  deleteLocalFilePublication,
  uploadPublication,
} from "./controller/multer/publicationMulter.ctrl";
import http from "http";
import { Server } from "socket.io";
import { createSocketServer } from "./chat/server";
import { createServer } from "http";
//import {version} from "../../package.json"
import config from "./config/default";

const app = express();
app.use(cors());
app.use(express.json());

const porto = config.port;
const host = config.host;
const corsOrigin = "*";
/*const io = new Server(9201);

createSocketServer(io);*/
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

httpServer.listen(porto, host, () => {
  createSocketServer({ io });
});

const port = process.env.PORT || 3001;

//app.use(uploadUser.single("photoUser"),routeUser,deleteLocalFileUser as express.RequestHandler);
app.use(uploadUser.single("photoUser"), routeUser);
app.use(routeLocation);
app.use(routeComment);
app.use(
  uploadPublication.single("photoPublication"),
  routePublication,
  deleteLocalFilePublication as express.RequestHandler
);
app.use(routeActivity);
app.use(routeApplication);

dbInit().then(() => console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`Ready on port ${port}`));
