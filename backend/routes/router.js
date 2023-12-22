import express from "express";
import authRouter from "./auth.js";
import matchRouter from "./matches.js";
import stadiumRouter from "./stadium.js";
import teamsRouter from "./teams.js";
import reservationRouter from "./reservation.js";
import userRouter from "./user.js";

const mainRouter = express.Router();

mainRouter.use(authRouter);
mainRouter.use(matchRouter);
mainRouter.use(teamsRouter);
mainRouter.use(stadiumRouter);
mainRouter.use(reservationRouter);
mainRouter.use(userRouter);

mainRouter.use((req, res) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
