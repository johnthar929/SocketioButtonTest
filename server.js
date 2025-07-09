const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Use the Render-assigned PORT or default to 3000
const PORT = process.env.PORT || 3000;

// Initialize Socket.IO with CORS settings
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (adjust as needed for security)
        methods: ["GET", "POST"]
    }
});

// Serve a basic homepage (optional)
app.get('/', (req, res) => {
    //res.send('WebSocket server is running!');
    res.sendFile(__dirname + "/index.html"); //links to html file CHANGE /index.html to you actually html file
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle button click event
    socket.on('button_clicked', () => {
        socket.broadcast.emit('alert_user', 'User 1 clicked the button!');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
