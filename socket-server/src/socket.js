import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const server = http.createServer(app);

const hostedUrl = process.env.FRONTEND_URL || "http://localhost:3000";

const io = new Server(server, {
    cors: {
        origin: [hostedUrl],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log("Updated userSocketMap:", userSocketMap);
    }

    io.emit("users:online", Object.keys(userSocketMap));

    socket.on("voice:sent", ({ senderId, receiverId, voiceUrl }) => {
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("voice:received", { senderId, voiceUrl });
        }
    });

    socket.on("song:playing", ({ userId, songTitle, artist }) => {
        socket.broadcast.emit("song:update", { userId, songTitle, artist });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("users:online", Object.keys(userSocketMap));
    });
});

export { app, io, server };
