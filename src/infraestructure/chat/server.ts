const express =  require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

export function createSocketServer(io){
const rooms = {};

io.on('connection', socket => {
    console.log('connection')
    /*
        If a peer is initiator, he will create a new room
        otherwise if peer is receiver he will join the room
    */
    socket.on('join room', roomID => {
        console.log('join room')
        if(rooms[roomID]){
            console.log('RoomId: '+roomID)
            console.log('SocketID: '+socket.id)
            // Receiving peer joins the room
            rooms[roomID].push(socket.id)
            console.log('rooms[roomID].push(socket.id)  :'+rooms[roomID].push(socket.id))
        }
        else{
            // Initiating peer create a new room
            console.log('Initiating peer create a new room')
            rooms[roomID] = [socket.id];
            console.log('RoomIDelse:    '+roomID);
        }

        /*
            If both initiating and receiving peer joins the room,
            we will get the other user details.
            For initiating peer it would be receiving peer and vice versa.
        */
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        console.log('OtherUser:  '+otherUser);
        if(otherUser){
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
            console.log('Emited')
        }
    });

    /*
        The initiating peer offers a connection
    */
    socket.on('offer', payload => {
        console.log('Offers connection')
        io.to(payload.target).emit('offer', payload);
    });

    /*
        The receiving peer answers (accepts) the offer
    */
    socket.on('answer', payload => {
        console.log('Accepts')
        io.to(payload.target).emit('answer', payload);
    });

    socket.on('ice-candidate', incoming => {
        console.log('ICE')
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    })
});

server.listen(9000, () => console.log("Server is up and running on Port 9000"));
}
