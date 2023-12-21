import express from "express";
import stadiumController from "../controllers/stadiumController.js";
import { verifyAuthToken } from "../middlewares/authMiddlewares.js";
import stadiumValidator from "../validators/stadiumValidator.js";
import { validateRequestSchema } from "../middlewares/validationResult.js";

const stadiumRouter = express.Router();

stadiumRouter.post(
  "/stadium",
  verifyAuthToken,
  stadiumValidator.createStadium,
  validateRequestSchema,
  stadiumController.createStadium
);

stadiumRouter.get("/stadium", verifyAuthToken, stadiumController.getStadiums);

stadiumRouter.get(
  "/stadium/:stadiumId",
  verifyAuthToken,
  stadiumController.getStadium
);

export default stadiumRouter;
