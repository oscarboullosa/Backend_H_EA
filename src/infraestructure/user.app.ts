import "dotenv/config";
import express from "express";
import cors from "express";
import dbInit from "./db/mongo";
import route from "./route/user.route";
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use(route);
dbInit().then(()=> console.log("Connection to MongoDB is ready"));
app.listen(port, () => console.log(`USER, Ready on port ${port}`));