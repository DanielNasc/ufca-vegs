import express from "express";
import http from "http";
import cors from "cors";

import { router } from "./routes";
import { SocketIoService } from "./services/SocketIo";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const socketIO = SocketIoService.getInstance()

socketIO.setUpSocket(server)

app.use(express.json());
app.use(cors());
app.use(router);

server.listen(PORT, () => console.log(`server running at port ${PORT}`));