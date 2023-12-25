import express from "express";
import { verifyAuthToken } from "../middlewares/authMiddlewares.js";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get(
  "/user/reservation/:matchId",
  verifyAuthToken,
  userController.getReservation
);

export default userRouter;
