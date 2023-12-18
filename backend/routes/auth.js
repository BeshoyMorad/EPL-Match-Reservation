import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.js";
import {
  loginValidator,
  signupValidator,
  usernameValidator,
} from "../validators/userValidators.js";
import authController from "../controllers/authController.js";
import { verifyAuthToken } from "../middlewares/authMiddlewares.js";

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

authRouter.post(
  "/approve-user",
  verifyAuthToken,
  usernameValidator,
  validateRequestSchema,
  authController.approveUser
);

authRouter.post(
  "/remove-user",
  verifyAuthToken,
  usernameValidator,
  validateRequestSchema,
  authController.removeUser
);

export default authRouter;
