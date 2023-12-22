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
    const error = new Error("Stadium not found");
    error.statusCode = 400;
    throw error;
  }
  return venue;
}

export function compareTeamIds(homeTeamId, awayTeamId) {
  if (homeTeamId.toString() === awayTeamId.toString()) {
    const error = new Error("Home and Away teams can't be the same");
    error.statusCode = 400;
    throw error;
  }
}

export async function addMatchReservation(match, reservation) {
  match.reservations.push(reservation.id);
  await match.save();
}

export async function addMatchSpectator(match, user) {
  match.spectators.push(user.id);
  await match.save();
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
  checkValidId(matchId);
  const match = await Match.findById(matchId)
    .populate("homeTeamId")
    .populate("awayTeamId")
    .populate("venueId")
    .populate("spectators")
    .populate("reservations");
  // .populate("reservations");
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

export async function retrieveMatches() {
  const matches = await Match.find()
    .populate("homeTeamId")
    .populate("awayTeamId")
    .populate("venueId");
  return matches;
}

export async function computeReservedSeats(matchId) {
  const match = await getMatchById(matchId);
  const reservations = match.reservations;
  const reservedSeats = reservations.map(
    (reservation) => reservation.seatIndex
  );
  return reservedSeats;
}

export async function computeVacantSeats(matchId) {
  const match = await getMatchById(matchId);
  const venue = match.venueId;
  const totalCapacity = venue.numberOfRows * venue.seatsPerRow;
  const reservedSeats = reservations.map(
    (reservation) => reservation.seatIndex
  );
  const vacantSeats = [];
  for (let i = 0; i < totalCapacity; i++) {
    if (!reservedSeats.includes(i)) {
      vacantSeats.push(i);
    }
  }
  return vacantSeats;
}
