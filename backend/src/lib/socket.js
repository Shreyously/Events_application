     // backend/src/lib/socket.js
     import { Server } from 'socket.io';

     let ioInstance;

     export const setupSocket = (server) => {
       ioInstance = new Server(server, {
         cors: {
           origin: "https://events-application-mu.vercel.app",
           methods: ["GET", "POST"],
           credentials: true
         }
       });

       ioInstance.on('connection', (socket) => {
         console.log('Client connected:', socket.id);

         // Handle joining room
         socket.on('joinRoom', ({ eventId }) => {
           socket.join(`event:${eventId}`);
         });

         // Handle leaving room
         socket.on('leaveRoom', ({ eventId }) => {
           socket.leave(`event:${eventId}`);
         });

         // Additional event handlers can be added here

         socket.on('disconnect', () => {
           console.log('Client disconnected:', socket.id);
         });
       });

       return ioInstance;
     };

     export const getIO = () => {
       if (!ioInstance) {
         throw new Error("Socket.io not initialized!");
       }
       return ioInstance;
     };