import { Server } from "socket.io";
import http from "http"
import { getDayAndHour } from "../../utils/getDayAndHour";
import { MealReservationsRepository } from "../../repositories/implementations/MealReservationsRepository";
import { getMeal } from "../../utils/getMeal";
import { VegsRepository } from "../../repositories/implementations/VegsRepository";

const mealReservationsRepository = MealReservationsRepository.getInstance();
const vegsRepository = VegsRepository.getInstance()

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
                const {day, hour} = getDayAndHour()
                const meal = getMeal(hour)
                mealReservationsRepository.decreaseCounter(Number(card), {day, meal}) && this.broadcast("one passed")
            })
            socket.on("initialize counter", () => {
                const {day, hour} = getDayAndHour();
                const meal = getMeal(hour);

                mealReservationsRepository.initializeVegsCounter({meal, day});

                this.broadcast("counter initialized");
            })
            socket.on("clear counter", () => {
                const {day, hour} = getDayAndHour();
                const meal = getMeal(hour);

                mealReservationsRepository.reset({meal, day});
                vegsRepository.resetScheduledMeal({day, meal})
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
