import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import UserRoute from "./routes/user.route.js";
import EventRoute from "./routes/event.route.js";
import { createServer } from 'http';
import setupSocket from './lib/socket.js'; // Update the import path

dotenv.config();

const app = express();
app.use((req, res, next) => {
    req.io = io;
    next();
  });

const httpServer = createServer(app);
export const io = setupSocket(httpServer);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://events-application-mu.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}));
// app.options("*", cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'https://events-application-mu.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
});
// Routes
app.use("/api/user", UserRoute);
app.use("/api/events", EventRoute);

// Connect to DB and start server
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

export { app };