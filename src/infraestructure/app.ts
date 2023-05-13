import "dotenv/config";
import express from "express";
import cors from "cors";
import dbInit from "./db/mongo";
import routeUser from "./route/user.route";
import routeLocation from "./route/location.route"
import routeComment from "./route/comment.route";
import routePublication from "./route/publication.route"
import routeActivity from "./route/activity.route";
import routeApplication from "./route/application.route";
import { deleteLocalFile, uploadUser } from "./controller/multer/userMulter.ctrl";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use(uploadUser.single("photoUser"));

app.use(routeUser);
app.use(routeLocation);
app.use(routeComment);
app.use(routePublication);
app.use(routeActivity);
app.use(routeApplication);

app.use(deleteLocalFile as express.RequestHandler);
dbInit().then(()=> console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`Ready on port ${port}`));