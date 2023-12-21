import express from "express";
import authRouter from "./auth.js";
import matchRouter from "./matches.js";
import teamsRouter from "./teams.js";

const mainRouter = express.Router();

mainRouter.use(authRouter);
mainRouter.use(matchRouter);
mainRouter.use(teamsRouter);

mainRouter.use((req, res) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
