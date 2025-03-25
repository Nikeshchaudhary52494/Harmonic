import { Server } from "socket.io";
import express from "express";
import http from "http"

const rooms = new Map();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://harmonic-music.vercel.app"],
    methods: ["GET", "POST"]
  },
});

const userSocketMap = {};


io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log("Updated userSocketMap:", userSocketMap);
  }

  socket.on('join-room', (roomId, isHost, userId, username, songId) => {
    socket.join(roomId);

    if (isHost) {
      rooms.set(roomId, {
        hostId: socket.id,
        users: new Set([socket.id]),
        playback: {
          songId: songId || null,
          isPlaying: false,
          progress: 0,
          volume: 1,
          queue: songId ? [songId] : []
        },
        messages: []
      });

      console.log(`Room created: ${roomId} by ${username}`);
    } else if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.users.add(socket.id);

      socket.emit('sync-state', {
        ...room.playback,
        messages: room.messages,
        members: Array.from(room.users).map(id => ({
          id,
          isHost: id === room.hostId
        }))
      });

      socket.to(roomId).emit('user-joined', { userId, username });
      console.log(`User ${username} joined room ${roomId}`);
    } else {
      socket.emit('room-not-found');
    }
  });

  socket.on('control-playback', (roomId, state) => {
    console.log({
      roomId,
      state,
    })
    const room = rooms.get(roomId);
    if (!room || socket.id !== room.hostId) return;

    room.playback = { ...room.playback, ...state };

    socket.to(roomId).emit('sync-state', room.playback);
    console.log(`Playback state updated in room ${roomId}`);
  });

  socket.on('send-message', (roomId, message, userId, username) => {
    const room = rooms.get(roomId);
    if (!room || !room.users.has(socket.id)) return;

    const newMessage = {
      userId,
      username,
      message,
      timestamp: new Date()
    };

    room.messages.push(newMessage);
    io.to(roomId).emit('new-message', newMessage);
  });


  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    const room = rooms.get(roomId);
    if (!room) return;

    room.users.delete(socket.id);
    io.to(roomId).emit('user-left', socket.id);

    if (room.users.size === 0) {
      rooms.delete(roomId);
      console.log(`Room ${roomId} deleted (no users left)`);
    } else if (socket.id === room.hostId) {
      const newHostId = room.users.values().next().value;
      room.hostId = newHostId;
      io.to(roomId).emit('host-changed', newHostId);
    }
  });

  socket.on('disconnect', () => {
    rooms.forEach((room, roomId) => {
      if (room.users.has(socket.id)) {
        room.users.delete(socket.id);
        io.to(roomId).emit('user-left', socket.id);
      }
    });
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Periodically clean up empty rooms
setInterval(() => {
  rooms.forEach((room, roomId) => {
    if (room.users.size === 0) {
      rooms.delete(roomId);
      console.log(`Cleaned up empty room: ${roomId}`);
    }
  });
}, 60 * 60 * 1000);

export { app, io, server };
