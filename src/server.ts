import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

import { router } from "./routes";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://127.0.0.1:5500",
	}
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
	console.log("user connected");

	socket.on("pei", () => {
		socket.emit("pow");
	});
});

server.listen(PORT, () => console.log(`server running at port ${PORT}`));