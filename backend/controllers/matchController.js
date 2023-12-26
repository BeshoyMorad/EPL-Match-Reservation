import {
  addNewMatch,
  computeReservedSeats,
  computeVacantSeats,
  getMatchById,
  retrieveMatches,
  updateMatch,
  validateMatchDetails,
} from "../services/matchServices.js";
import { checkUserRole } from "../services/userServices.js";

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
    await validateMatchDetails(homeTeamId, awayTeamId, venueId, dateAndTime);
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
      res.status(error.statusCode).json({ error: [error.message] });
    } else {
      console.log(error);
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
      req.body.venueId,
      req.body.dateAndTime
    );
    await updateMatch(match, req.body);
    return res.status(200).json("Match updated successfully");
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: [error.message] });
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
      res.status(error.statusCode).json({ error: [error.message] });
    } else {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  }
};

const getMatches = async (req, res) => {
  try {
    const matches = await retrieveMatches();
    return res.status(200).json(matches);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: [error.message] });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getVacantSeats = async (req, res) => {
  try {
    const matchId = req.params.id;
    const vacantSeats = await computeVacantSeats(matchId);
    return res.status(200).json(vacantSeats);
  } catch (error) {
    console.log(error)
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: [error.message] });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getReservedSeats = async (req, res) => {
  try {
    const matchId = req.params.id;
    const reservedSeats = await computeReservedSeats(matchId);
    return res.status(200).json(reservedSeats);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: [error.message] });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const matchController = {
  createMatch,
  editMatch,
  getMatch,
  getMatches,
  getVacantSeats,
  getReservedSeats,
};

export default matchController;
