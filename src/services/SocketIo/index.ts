import { Server } from "socket.io";
import http from "http"
import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { getDayAndHour } from "../../utils/getDayAndHour";

const vegsRepository = VegsRepository.getInstance();

export class SocketIoService {
    private io: Server | undefined;
    private static INSTANCE: SocketIoService;

    setUpSocket(srv: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
        this.io = new Server(srv, {
            cors: {
                origin: "http://127.0.0.1:5500"
            }
        })

        this.io.on("connect", (socket) => {
            console.log("user connected");

            socket.on("one passed", () => {
                vegsRepository.decreaseCounter()
                this.broadcast("one passed")
            })
            socket.on("initialize counter", () => {
                let meal: "lunch" | "dinner";
                const {day, hour} = getDayAndHour();
                
                if (hour < 14)
                    meal = "lunch";
                else 
                    meal = "dinner";

                vegsRepository.initializeVegsCounter(meal, day);

                this.broadcast("counter initialized");
            })
            socket.on("clear counter", () => {
                vegsRepository.clearCounter();
                this.broadcast("counter cleaned");
            })
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