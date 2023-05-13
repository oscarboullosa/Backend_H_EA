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
import multer from "multer";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

/*const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});*/

const upload = multer({ 
  storage: multer.memoryStorage() 
});

app.use(upload.single("photoUser"));

app.use(routeUser);
app.use(routeLocation);
app.use(routeComment);
app.use(routePublication);
app.use(routeActivity);
app.use(routeApplication);

dbInit().then(()=> console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`Ready on port ${port}`));