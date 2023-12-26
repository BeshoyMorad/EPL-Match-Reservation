import { checkValidId } from "../utils/validationUtils.js";
import Team from "../models/Team.js";
import Stadium from "../models/Stadium.js";
import Match from "../models/Match.js";
import Reservation from "../models/Reservation.js";

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

export async function compareTeamIds(homeTeamId, awayTeamId, dateAndTime) {
  if (homeTeamId.toString() === awayTeamId.toString()) {
    const error = new Error("Home and Away teams can't be the same");
    error.statusCode = 400;
    throw error;
  }
  if ( dateAndTime )
  {
    if (typeof dateAndTime === "string") dateAndTime = new Date(dateAndTime);

    let afterdateAndTime =new Date();
    let beforedateAndTime = new Date();

    afterdateAndTime.setDate(dateAndTime.getDate() + 1);
    beforedateAndTime.setDate( dateAndTime.getDate() - 1 );
    
    
    const homehomeMatches = await Match.find({
      homeTeamId: homeTeamId,
      dateAndTime: { $gt: beforedateAndTime, $lt: afterdateAndTime },
    } );
    
    console.log(homehomeMatches);
    const awayawayMatches = await Match.find({
      awayTeamId: awayTeamId,
      dateAndTime: { $gt: beforedateAndTime, $lt: afterdateAndTime },
    });
    const homeawayMatches = await Match.find({
      homeTeamId: awayTeamId,
      dateAndTime: { $gt: beforedateAndTime, $lt: afterdateAndTime },
    });
    const awayhomeMatches = await Match.find({
      awayTeamId: homeTeamId,
      dateAndTime: { $gt: beforedateAndTime, $lt: afterdateAndTime },
    } );
    if (
      homeawayMatches.length != 0 ||
      awayawayMatches.length != 0 ||
      homehomeMatches.length != 0 ||
      awayhomeMatches.length != 0
    ) {
      const error = new Error(
        "One of those teams is already playing on this day"
      );
      error.statusCode = 400;
      throw error;
    }
  }
}

export async function addMatchReservation(match, reservation) {
  match.reservations.push(reservation.id);
  await match.save();
}

export async function addMatchSpectator(match, user) {
  for (let spectator of match.spectators) {
    if (spectator.id.toString() === user.id.toString()) return;
  }
  match.spectators.push(user.id);
  await match.save();
}

export async function addNewMatch(matchDetails) {
  const newMatch = new Match(matchDetails);
  await newMatch.save();
}

export async function checkMatchTime(venueId, dateAndTime) {
  if (typeof dateAndTime === "string") dateAndTime = new Date(dateAndTime);
  if (dateAndTime < Date.now()) {
    const error = new Error("Match date must be in the future");
    error.statusCode = 400;
    throw error;
  }
  const matches = await Match.find({
    venueId: venueId,
  }).sort({ dateAndTime: -1 });
  if (!matches) {
    return true;
  }
  for (let match of matches) {
    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(match.dateAndTime - dateAndTime);

    // Convert milliseconds to hours
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    // Check if the difference is at least 2 hours
    if (hoursDifference < 3) {
      const error = new Error("Close dates between the available matches");
      error.statusCode = 400;
      throw error;
    }
  }
}

export async function validateMatchDetails(
  homeTeamId,
  awayTeamId,
  venueId,
  dateAndTime
) {
  homeTeamId &&
    awayTeamId &&
    (await compareTeamIds(homeTeamId, awayTeamId, dateAndTime));
  homeTeamId && (await checkTeamId(homeTeamId));
  awayTeamId && (await checkTeamId(awayTeamId));
  venueId && (await checkVenueId(venueId));
  venueId && dateAndTime && (await checkMatchTime(venueId, dateAndTime));
}

export async function getMatchById(matchId) {
  checkValidId(matchId);
  const match = await Match.findById(matchId)
    .populate("homeTeamId")
    .populate("awayTeamId")
    .populate("venueId")
    .populate("spectators");
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
  const matches = await Match.find({ dateAndTime: { $gt: Date.now() } })
    .populate("homeTeamId")
    .populate("awayTeamId")
    .populate("venueId");
  console.log(matches.length);
  return matches;
}

export async function computeReservedSeats(matchId) {
  const match = await getMatchById(matchId);
  match.reservations = await Reservation.find({ matchId: match.id });
  const reservations = match.reservations;
  const reservedSeats = reservations.map(
    (reservation) => reservation.seatIndex
  );
  return reservedSeats;
}

export async function computeVacantSeats(matchId) {
  const match = await getMatchById(matchId);
  match.reservations = await Reservation.find({ matchId: match.id });
  const venue = match.venueId;
  const totalCapacity = venue.numberOfRows * venue.seatsPerRow;
  const reservedSeats = match.reservations.map(
    (reservation) => reservation.seatIndex
  );
  console.log(reservedSeats);
  const vacantSeats = [];
  for (let i = 0; i < totalCapacity; i++) {
    if (!reservedSeats.includes(i)) {
      vacantSeats.push(i);
    }
  }
  return vacantSeats;
}
