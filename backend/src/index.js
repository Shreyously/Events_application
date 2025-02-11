   // backend/src/index.js
   import express from "express";
   import dotenv from "dotenv";
   import cors from "cors";
   import cookieParser from "cookie-parser";
   import { connectDB } from "./lib/db.js";
   import UserRoute from "./routes/user.route.js";
   import EventRoute from "./routes/event.route.js";
   import { createServer } from 'http';
   import { setupSocket } from './lib/socket.js'; // Import setupSocket

   dotenv.config();

   const app = express();

   // Initialize HTTP server and Socket.io
   const httpServer = createServer(app);
   setupSocket(httpServer); // Initialize Socket.io

   // Middleware
   app.use(express.json({ limit: '10mb' }));
   app.use(express.urlencoded({ limit: '10mb', extended: true }));
   app.use(cookieParser());

   app.use(cors({
     origin: "https://events-application-mu.vercel.app",
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
     credentials: true,
     exposedHeaders: ["set-cookie"]
   }));

   // Routes
   app.use("/api/user", UserRoute);
   app.use("/api/events", EventRoute);

   // Connect to DB and start server
   const PORT = process.env.PORT || 5000;
   connectDB().then(() => {
     httpServer.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });
   });

   export { app };