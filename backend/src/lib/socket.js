import { Server } from 'socket.io';

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle joining room without creating log
    socket.on('joinRoom', ({ eventId }) => {
      socket.join(`event:${eventId}`);
    });

    // Handle leaving room without creating log
    socket.on('leaveRoom', ({ eventId }) => {
      socket.leave(`event:${eventId}`);
    });

    // Handle user join event
    socket.on('userJoined', (data) => {
      io.to(`event:${data.eventId}`).emit('userJoined', {
        username: data.username,
        userId: data.userId,
        timestamp: data.timestamp
      });
    });

    // Handle user leave event
    socket.on('userLeft', (data) => {
      io.to(`event:${data.eventId}`).emit('userLeft', {
        username: data.username,
        userId: data.userId,
        timestamp: data.timestamp
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export default setupSocket;