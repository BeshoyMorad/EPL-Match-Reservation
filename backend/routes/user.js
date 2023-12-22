import express from "express";
import { verifyAuthToken } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.get("/user/reservation", verifyAuthToken);

export default userRouter;
