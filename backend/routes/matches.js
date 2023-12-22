import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.js";
import matchController from "../controllers/matchController.js";
import {
  createMatchValidator,
  editMatchValidator,
} from "../validators/matchValidators.js";
import { verifyAuthToken } from "../middlewares/authMiddlewares.js";
import { checkId } from "../middlewares/checkId.js";

const matchRouter = express.Router();

matchRouter.post(
  "/match",
  verifyAuthToken,
  createMatchValidator,
  validateRequestSchema,
  matchController.createMatch
);

matchRouter.put(
  "/match/:id",
  verifyAuthToken,
  checkId,
  editMatchValidator,
  validateRequestSchema,
  matchController.editMatch
);

matchRouter.get("/match/:id", checkId, matchController.getMatch);

matchRouter.get("/matches", matchController.getMatches);

matchRouter.get(
  "/vacant-seats/:id",
  checkId,
  matchController.getVacantSeats
);

matchRouter.get(
  "/reserved-seats/:id",
  checkId,
  matchController.getReservedSeats
);

export default matchRouter;
