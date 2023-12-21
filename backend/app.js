import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import mainRouter from "./routes/router.js";
import Team from "./models/Team.js";
import teams from "./seeds/teams.js";
import http from "http"
import { Server }  from "socket.io"

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
