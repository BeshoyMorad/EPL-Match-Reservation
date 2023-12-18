import {
  addNewMatch,
  getMatchById,
  updateMatch,
  validateMatchDetails,
} from "../services/matchServices.js";

const createMatch = async (req, res) => {
  try {
    const {
      homeTeamId,
      awayTeamId,
      venueId,
      dateAndTime,
      mainReferee,
      firstLinesman,
      secondLinesman,
    } = req.body;
    const username = req.payload.username;
    await checkUserRole(username, "manager");
    await validateMatchDetails(homeTeamId, awayTeamId, venueId);
    await addNewMatch({
      homeTeamId,
      awayTeamId,
      venueId,
      dateAndTime,
      mainReferee,
      firstLinesman,
      secondLinesman,
    });
    return res.status(201).json("Match created successfully");
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const editMatch = async (req, res) => {
  try {
    const username = req.payload.username;
    const matchId = req.params.id;
    await checkUserRole(username, "manager");
    const match = await getMatchById(matchId);
    await validateMatchDetails(
      req.body.homeTeamId,
      req.body.awayTeamId,
      req.body.venueId
    );
    await updateMatch(match, req.body);
    return res.status(200).json("Match updated successfully");
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    const match = await getMatchById(matchId);
    return res.status(200).json(match);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const matchController = {
  createMatch,
  editMatch,
  getMatch,
};

export default matchController;