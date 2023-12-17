import express from "express";

const mainRouter = express.Router();

// Add other routers here

mainRouter.use((req, res) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
