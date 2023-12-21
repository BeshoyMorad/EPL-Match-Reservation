import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import mainRouter from "./routes/router.js";
import Team from "./models/Team.js";
import teams from "./seeds/teams.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "images")));

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

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EPL",
      version: "1.0.0",
      description: "API-Documentation",
    },
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(mainRouter);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
