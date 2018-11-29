// Require Library
const express = require('express');
const socketIO = require('socket.io');

//create express server
const app = express();
const port = process.env.PORT || 5001;

// Serve static files in public folder
app.use(express.static('public'));

//Start server and listen on a port
var server = app.listen(port, () => {
    console.log(`Server started on port 5001`);
});

//use server on port 5000 for SocketIO connections
const io = socketIO(server);


// What should socketIO do ?
// Accept connection request from client and print user connected
//Initialize empty array to store client connections
var connections = [];

io.on('connection', (socket) => {
    connections.push(socket);
    console.clear();
    console.log(`${connections.length} user(s) connected`);

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.clear();
        console.log(`${connections.length} user(s) remaining`)
    });
    // get data from client and emit it to all clients
    socket.on('chat', (data) => {
        let username = data.username;
        let message = data.message;

        if (username == '' || message == '') {
            socket.emit('espection', {
                fielderr: errmsg
            });
        } else {
            socket.emit('chat', data);
            io.sockets.emit('chat', data);
        }
    });
    // get user is typing from client and emit to all clients except you
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

});