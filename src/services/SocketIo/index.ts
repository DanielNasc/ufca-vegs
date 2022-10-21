import { Server } from "socket.io";
import http from "http"

export class SocketIoService {
    private io: Server | undefined;
    private static INSTANCE: SocketIoService;

    setUpSocket(srv: number | http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
        this.io = new Server(srv, {
            cors: {
                origin: "http://127.0.0.1:5500"
            }
        })

        this.io.on("connect", (socket) => {
            console.log("user connected");

            socket.on("one passed", () => this.broadcast("one passed"))
        })
    }

    public static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new SocketIoService();
        }

        return this.INSTANCE;
    }

    broadcast(msg: string) {
        if (!this.io) {
            throw new Error("IO not initialized");
        }

        this.io.emit(msg)
    }
}