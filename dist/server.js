const express = require('express');
const path = require('path');
const app = express();
app.set('port', process.env.PORT || 3000);
const http = require('http').Server(app);
// set up socket.io and bind it to our
const io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client/index.html'));
});
io.on('connection', function (socket) {
    console.log('Player is connected!');
    socket.on('join', function (data) {
        console.log(data);
    });
});
const server = http.listen(3000, function () {
    console.log('listening on *:3000');
});
