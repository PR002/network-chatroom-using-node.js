const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');
// Handle new user and send a welcome message
  socket.on('new user', (username) => {
    socket.username = username;
    //const welcomeMessage = `Welcome, ${username}!`;
    //io.emit('chat message', welcomeMessage);
});  
  // Handle incoming messages
  socket.on('chat message', (message) => {
    const fullMessage = `${socket.username}: ${message}`;
    console.log('Message received:', fullMessage);
    // Broadcast the message to all clients
    io.emit('chat message', fullMessage);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
