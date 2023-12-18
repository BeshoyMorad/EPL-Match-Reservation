import { checkValidId } from "../utils/validationUtils.js";
import Team from "../models/Team.js";
import Stadium from "../models/Stadium.js";
import Match from "../models/Match.js";

export async function checkTeamId(teamId) {
  checkValidId(teamId);
  const team = await Team.findById(teamId);
  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 400;
    throw error;
  }
  return team;
}

export async function checkVenueId(venueId) {
  checkValidId(venueId);
  const venue = await Stadium.findById(venueId);
  if (!venue) {
    const error = new Error("Invalid Venue Id");
    error.statusCode = 400;
    throw error;
  }
  return venue;
}

export function compareTeamIds(homeTeamId, awayTeamId) {
  if (homeTeamId === awayTeamId) {
    const error = new Error("Home and Away teams can't be the same");
    error.statusCode = 400;
    throw error;
  }
}

export async function addNewMatch(matchDetails) {
  const newMatch = new Match(matchDetails);
  await newMatch.save();
}

export async function validateMatchDetails(homeTeamId, awayTeamId, venueId) {
  homeTeamId && awayTeamId && compareTeamIds(homeTeamId, awayTeamId);
  homeTeamId && (await checkTeamId(homeTeamId));
  awayTeamId && (await checkTeamId(awayTeamId));
  venueId && (await checkVenueId(venueId));
}

export async function getMatchById(matchId) {
  const match = await Match.findById(matchId);
  if (!match) {
    const error = new Error("Match not found");
    error.statusCode = 400;
    throw error;
  }
  return match;
}

export async function updateMatch(match, body) {
  for (const key in body) {
    match[key] = body[key];
  }
  await match.save();
}
