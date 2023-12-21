import { retrieveTeams } from "../services/teamServices.js";

const getTeams = async (req, res) => {
  try {
    const teams = await retrieveTeams();
    return res.status(200).json(teams);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: [error.message] });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const teamController = {
  getTeams,
};

export default teamController;
