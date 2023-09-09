const io = require('socket.io')(8080, {
  cors:{
    origin: ['http://127.0.0.1:3000'],
  },
})

const users = {}

io.on('connection', socket => {
  socket.on('new-user', Uname => {
    users[socket.id] = Uname
    socket.broadcast.emit('user-connected', Uname)
  })
  socket.on('send-chat-message', (message,room) => {
    socket.to(room).emit('chat-message', users[socket.id],  message )
  })
  socket.on("join-room", room => {
    socket.join(room);
  })
  socket.on('disconnect', () => {
   // socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})