import express from "express";
import authRouter from "./auth.js";

const mainRouter = express.Router();

mainRouter.use(authRouter);

mainRouter.use((req, res) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
