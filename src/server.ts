import * as dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import "express-async-errors";

import { router } from "./routes";
import { SocketIoService } from "./services/SocketIo";

import { AppError } from "./errors/AppError";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const socketIO = SocketIoService.getInstance();

socketIO.setUpSocket(server);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(" ") || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.use(
  (err: Error | AppError, _: Request, res: Response, __: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
);

server.listen(PORT, () => console.log(`server running at port ${PORT}`));
