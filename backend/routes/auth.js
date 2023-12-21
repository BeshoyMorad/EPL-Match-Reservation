import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.js";
import {
  loginValidator,
  signupValidator,
  usernameValidator,
  resetPasswordValidator,
  editUserValidator,
  createAdminValidator,
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

authRouter.delete(
  "/remove-user",
  verifyAuthToken,
  usernameValidator,
  validateRequestSchema,
  authController.removeUser
);

authRouter.post(
  "/reset-password",
  verifyAuthToken,
  resetPasswordValidator,
  validateRequestSchema,
  authController.resetPassword
);

authRouter.put(
  "/user",
  verifyAuthToken,
  editUserValidator,
  validateRequestSchema,
  authController.editUser
);

authRouter.get("/users", verifyAuthToken, authController.getUsers);

authRouter.get(
  "/unverified-users",
  verifyAuthToken,
  authController.getUnverifiedUsers
);

authRouter.get("/user", verifyAuthToken, authController.getUser);

authRouter.get("/admin", verifyAuthToken, authController.getAdmin);

authRouter.post(
  "/admin",
  verifyAuthToken,
  createAdminValidator,
  validateRequestSchema,
  authController.createAdmin
);

export default authRouter;
