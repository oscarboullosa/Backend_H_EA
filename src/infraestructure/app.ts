import "dotenv/config";
import express from "express";
import cors from "cors";

import http from "http";
import { createServer } from "http";
import { Server } from "socket.io";
import socket from "./chat/server";
import config from "./config/default";
import log from "./utils/logger";

const { port, host, corsOrigin } = config;

const app = express();
app.use(cors());
app.use(express.json());


app.listen(port, () => console.log(`Hey! Listening on port ${port}`));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) =>
  res.send(`Server is up and running version 1.0.0`)
);


httpServer.listen(port, host, () => {
  log.info(`🚀 Server version 1.0.0 is listening 🚀`);
  log.info(`http://${host}:${port}`);

  socket({ io });
});
