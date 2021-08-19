const express = require('express');
const cors = require('cors');
const { Socket } = require('socket.io');
const app = express();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./server/users.js')
require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000
const server = app.listen(port, () => console.log(`The server is running on port ${ port }`));

require('./server/routes/chat.routes')(app);

const io = require('socket.io')(server, { cors: true });

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the ${ user.room } room.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.`});

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message })

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`})
        }
    })
})