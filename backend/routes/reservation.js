import express from "express";
import { verifyAuthToken } from "../middlewares/authMiddlewares.js";
import reservationController from "../controllers/reservationController.js";

const reservationRouter = express.Router();

reservationRouter.post(
  "/reservation",
  verifyAuthToken,
  reservationController.addReservation
);

reservationRouter.delete(
  "/reservation",
  verifyAuthToken,
  reservationController.cancelReservation
);

export default reservationRouter;
