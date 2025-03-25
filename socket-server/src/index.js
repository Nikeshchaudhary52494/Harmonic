import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { app, server } from './socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const allowedOrigins = [
	"http://localhost:3000",
	"https://harmonic-music.vercel.app"
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);
app.get('/', (_, res) => {
	res.json({ message: "Harmonic WebSocket Server" });
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});