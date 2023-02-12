import { Server } from "socket.io";
import http from "http";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { getMeal } from "../../utils/getMeal";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { MealHistoryRepository } from "../../repositories/implementations/postgres/MealHistoryRepository";

const mealReservationsRepository = new MealReservationsRepository();
const vegsRepository = new VegsRepository();
const mealHistoryRepository = new MealHistoryRepository();

export class SocketIoService {
  private io: Server | undefined;
  private static INSTANCE: SocketIoService;

  setUpSocket(
    srv: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.io = new Server(srv, {
      cors: {
        origin: process.env.CORS_ORIGIN?.split(" ") || "*",
        credentials: true,
        methods: ["GET", "POST"],
      },
      allowEIO3: true,
    });

    this.io.on("connect", (socket) => {
      console.log("user connected");

      socket.on("one passed", async (card) => {
        const { day, hour } = getDayAndHour();
        const meal = getMeal(hour);
        const user_id = await vegsRepository.getIdByCard(parseInt(card));

        if (!user_id) return;

        await mealReservationsRepository.saveToHistory(
          user_id,
          meal,
          day,
          true
        );
        this.broadcast("decrement");
      });

      socket.on("clear", async () => {
        await mealReservationsRepository.clearDatabase();
        this.broadcast("cleaned");
      });
    });
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

    this.io.emit(msg);
  }
}
