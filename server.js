const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // When a user sends a "button_clicked" event
    socket.on('button_clicked', () => {
        // Broadcast it to all other connected users
        socket.broadcast.emit('alert_user', 'User 1 clicked the button!');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
