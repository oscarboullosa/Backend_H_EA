import { Server } from 'socket.io';
import http from "http";
import { createServer } from "http";

const path = require('path');
const express = require('express');
const app = express();
const corsOrigin = "*"
const httpServer=createServer(app);
const io=new Server(httpServer,{
  cors:{
    origin:corsOrigin,
    credentials:true,
  }
})
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', (socket) => {
  // Say Hi to all connected clients
  io.emit('broadcast', '[Server]: Welcome stranger!');

  socket.on('message', (msg) => {
    console.log(`message received from user: ${msg.from}`);
    console.log(`message received content: ${msg.content}`);
    io.emit('message', msg);
  });

  // Say Bye to all connected clients
  socket.on('disconnect', function () {
    io.emit('broadcast', '[Server]: Bye, bye, stranger!');
  });
});

const port = process.env.PORT || 3001;
app.set('port', port);

httpServer.listen(port, () => {
  console.log('listening on *:3001');
});