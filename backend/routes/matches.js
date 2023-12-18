import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.js";
import matchController from "../controllers/matchController.js";
import { createMatchValidator } from "../validators/matchValidators.js";
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
  createMatchValidator,
  validateRequestSchema,
  matchController.editMatch
);

matchRouter.get(
  "/match/:id",
  verifyAuthToken,
  checkId,
  createMatchValidator,
  validateRequestSchema,
  matchController.getMatch
);

export default matchRouter;
