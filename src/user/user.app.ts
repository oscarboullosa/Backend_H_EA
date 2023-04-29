import "dotenv/config";
import express from "express";
import cors from "express";
import dbInit from "./infraestructure/db/mongo";
import route from "./infraestructure/route/user.route";
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use(route);
dbInit().then();
app.listen(port, () => console.log(`USER, Ready on port ${port}`));