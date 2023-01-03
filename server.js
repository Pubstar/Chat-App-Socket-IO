const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

let users = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  users++;
  socket.on('disconnect', () => {
    users--;
    io.emit('updateUsers', users);
  })
  socket.on('message', (data) => {
    io.emit('message', data);
  })

  io.emit('updateUsers', users);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port: ' + listener.address().port);
})