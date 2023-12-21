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

import {computeReservedSeats} from "./services/matchServices.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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

  // Send initial seats status to the client
  socket.emit("seatsStatus", seats);

  // Client side says there is a user want to reserve
  // reservation consists of matchId,Date,seats(index),token
  socket.on("reserveSeat", async (reservation) => {
    const payload = AuthServices.getPayload({
      headers: { authorization: reservation.token },
    });
    const user = await checkUserServices.getUserById(payload.userId);
    //Check if seat is taken
    const reservedSeats = await computeReservedSeats(reservation.matchId);
    let notReserved = false
    for (let seatIndex in reservation.seats) {
      if (seatIndex in reservedSeats) {
        io.emit(
          "reservationError",
          `Seat Number ${seatIndex} has been reserved already`
        );
        break;
      }

    }


    /*if (seats[seatIndex]) {
      seats[seatIndex] = false;
      // Broadcast updated seats status to all clients
      io.emit("seatsStatus", seats);
      console.log(`Seat ${seatIndex} reserved by a user`);
    }*/
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

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
