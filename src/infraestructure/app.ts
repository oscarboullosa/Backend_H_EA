import "dotenv/config";
import express from "express";
import cors from "express";
import dbInit from "./db/mongo";
import routeUser from "./route/user.route";
import route from "./route/location.route"
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use(route);
app.use(routeUser);
dbInit().then(()=> console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`Ready on port ${port}`));