import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/userValidators.js";
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  loginValidator,
  validateRequestSchema,
  authController.login
);

authRouter.post(
  "/signup",
  signupValidator,
  validateRequestSchema,
  authController.signup
);

export default authRouter;
