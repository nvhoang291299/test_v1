const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.post('/gameEvent', (req, res) => {
    const eventData = req.body;
    io.emit('broadcastEvent', eventData);
    res.sendStatus(200);
});


// Sự kiện khi client kết nối đến Mezon Server
io.on('connection', (socket) => {
    console.log('User connected to Mezon Socket');

    // Lắng nghe sự kiện từ Game Server
    socket.on('joinGame', (data) => {
        console.log('Received event from game:', data);

        // Broadcast đến các thành viên khác
        io.emit('broadcastEvent', { message: `Game event: ${data.event}` });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from Mezon Socket');
    });
});

// server.listen(3002, () => {
//     console.log('Mezon Socket Server is running on port 3002');
// });
