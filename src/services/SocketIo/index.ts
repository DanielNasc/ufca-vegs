import { Server } from "socket.io";
import http from "http"
import { getDayAndHour } from "../../utils/getDayAndHour";
import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { getMeal } from "../../utils/getMeal";
import { VegsRepository } from "../../repositories/implementations/VegsRepository";
import { MealHistoryRepository } from "../../repositories/implementations/MealHistoryRepository";

const mealReservationsRepository = MealReservationsRepository.getInstance();
const vegsRepository = VegsRepository.getInstance()
const mealHistoryRepository = MealHistoryRepository.getInstance()

export class SocketIoService {
    private io: Server | undefined;
    private static INSTANCE: SocketIoService;

    setUpSocket(srv: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
        this.io = new Server(srv, {
            cors: {
                origin: "*"
            }
        })

        mealReservationsRepository.initializeDatabase()

        this.io.on("connect", (socket) => {
            console.log("user connected");

            socket.on("one passed", (card) => {
                const { day, hour } = getDayAndHour()
                const meal = getMeal(hour)
                const user_id = vegsRepository.getIdByCard(parseInt(card))

                if (!user_id) return

                mealReservationsRepository.saveToHistory(user_id, meal, day, true)
                this.broadcast("decrement")
            })

            socket.on("clear", () => {
                mealReservationsRepository.clearDatabase()
                this.broadcast("cleaned")
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
