import http from "node:http";
import { Server } from "socket.io";

import { MealReservationsRepository } from "../../repositories/implementations/postgres/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/postgres/VegsRepository";
import { MealHistoryRepository } from "../../repositories/implementations/postgres/MealHistoryRepository";
import { MealProvider } from "../../utils/MealProvider";

const mealReservationsRepository = new MealReservationsRepository();
const vegsRepository = new VegsRepository();

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

      socket.on("init", async () => {
        MealProvider.getInstance().enableMeal();
        const counter = await mealReservationsRepository.countActiveVegs();

        if (counter !== null) {
          this.broadcast("initialized", {counter});
        }
      })

      socket.on("one passed", async (card) => {
        const currentMeal = MealProvider.getInstance().getMeal();

        if (!currentMeal) return;
        const { day, meal } = currentMeal;

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

      socket.on("terminate", async () => {
        await mealReservationsRepository.clearDatabase();
        MealProvider.getInstance().disableMeal();
        this.broadcast("terminated");
      })
    });
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new SocketIoService();
    }

    return this.INSTANCE;
  }

  broadcast(msg: string, data?: any) {
    if (!this.io) {
      throw new Error("IO not initialized");
    }

    if (data) {
      this.io.emit(msg, data);
      return;
    }

    this.io.emit(msg);
  }
}
