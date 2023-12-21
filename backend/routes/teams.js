import express from "express";
import teamController from "../controllers/teamController.js";

const teamsRouter = express.Router();

teamsRouter.get("/teams", teamController.getTeams);

export default teamsRouter;
