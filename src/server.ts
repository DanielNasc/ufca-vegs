import express from "express";
import http from "http";
import cors from "cors";

import { router } from "./routes";
import { SocketIoService } from "./services/SocketIo";

const app = express();
const server = http.createServer(app);
const socketIO = SocketIoService.getInstance()
socketIO.setUpSocket(server)

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

/* io.on("connection", (socket) => {
	socket.on("", () => {
		socket.emit("pow");
	});
});
 */
server.listen(PORT, () => console.log(`server running at port ${PORT}`));