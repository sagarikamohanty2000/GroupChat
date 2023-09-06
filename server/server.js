const io = require('socket.io')(8080, {
  cors:{
    origin: ["http://localhost:3000"],
  },
})

const users = {}

io.on('connection', socket => {
  socket.on('new-user', Uname => {
    users[socket.id] = Uname
    socket.broadcast.emit('user-connected', Uname)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', users[socket.id],  message )
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})