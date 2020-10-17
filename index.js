const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./routes/routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connect', (socket) => {
  console.log('We have a new connection !!');

  // new connection
  socket.on('join', ({ name, room }, callBack) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callBack(error);

    socket.join(user.room);
    socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callBack();
  });

  socket.on('sendMessage', (message, callBack) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callBack();
  });

  socket.on('disconnect', () => {

    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));


