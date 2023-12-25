import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import mainRouter from "./routes/router.js";
import Team from "./models/Team.js";
import teams from "./seeds/teams.js";
import http from "http";
import { Server } from "socket.io";
import checkUserServices from "./services/checkUserServices.js";
import AuthServices from "./services/AuthServices.js";
import { addUserReservation, addUserMatch } from "./services/userServices.js";

import {
  addMatchReservation,
  computeReservedSeats,
} from "./services/matchServices.js";
import reservationServices from "./services/reservationServices.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
  },
});

dotenv.config();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

let DB_URL = process.env.MONGO_URL.trim();
mongoose
  .connect(DB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");

    if ((await Team.countDocuments()) === 0) {
      teams.forEach(async (team) => {
        const newTeam = new Team({
          name: team,
          imagePath: `/images/${team}.png`,
        });
        await newTeam.save();
      });
    }
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB:", error);
  });

io.on("connection", (socket) => {
  console.log("A user connected");

  // Client side says there is a user want to reserve
  // reservation consists of matchId,Date,seats(index),token
  socket.on("reserveSeat", async (reservation) => {
    await reservationServices.socketsReservation(reservation, io);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(
  cors({
    origin: process.env.FRONT_BASE_URL.trim(),
    credentials: true,
  })
);
app.use(mainRouter);

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
