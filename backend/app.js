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
import errorHandlingUtils from "./utils/errorHandlingUtils.js";

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

  // Client side says there is a user want to reserve
  // reservation consists of matchId,Date,seats(index),token
  socket.on("reserveSeat", async (reservation) => {
    const payload = AuthServices.getPayload({
      headers: { authorization: reservation.token },
    });
    let user, match, reservedSeats;
    try {
      user = await checkUserServices.getUserById(payload.userId);
      match = await getMatchById(reservation.matchId);
      //Get All reserved Seats
      reservedSeats = await computeReservedSeats(reservation.matchId);
      reservation.customerId = payload.userId;
      //Check if seat is taken

      //Checking if all places are reserved or not
      let isAllReserved = true;
      //looping over sent seats that you want to book
      for (let seatIndex in reservation.seats) {
        //checking if the seat is in the reserved seats
        if (reservedSeats.includes(seatIndex)) {
          //Then This one informs user that there is an error while booking the seat at that index
          io.emit(
            "reservationError",
            `Seat Number ${seatIndex} has been reserved already`
          );
          isAllReserved = false;
          continue;
        }
        //If not then this has been done successfully
        const reservationDetails = await reservationServices.createReservation(
          reservation
        );
        await addUserReservation(user, reservationDetails);
        await addMatchReservation(match, reservationDetails);
      }
      //Then Add this match as match in user info
      await addUserMatch(user, reservation.matchId);

      if (isAllReserved) {
        io.emit("reservationError", `Seats have been reserved successfully`);
      }
    } catch (error) {
      io.emit("reservationError", `This user or Match doesn't exist`);
    }
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
