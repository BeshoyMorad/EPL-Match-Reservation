import Reservation from "../models/Reservation.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";
import AuthServices from "./AuthServices.js";
import checkUserServices from "./checkUserServices.js";
import {
  addMatchReservation,
  addMatchSpectator,
  getMatchById,
} from "./matchServices.js";
import { addUserMatch, addUserReservation } from "./userServices.js";

class reservationServices {
  static generateTimestampBasedID = async () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    return `${timestamp}`;
  };

  static getTicketNumber = async () => {
    const maxReservation = await Reservation.findOne({}, "ticketNumber", {
      sort: { ticketNumber: -1 },
    });
    if (maxReservation === null) return 1;
    else return maxReservation.ticketNumber + 1;
  };

  static deleteMatchFromUser = async (user, match) => {
    const reservation = await Reservation.findOne({
      customerId: user.id,
      match: match.id,
    });
    if (!reservation) {
      user.matches = user.matches.filter((userMatch) => {
        return match.id.toString() !== userMatch.matchId.toString();
      });

      match.spectators = match.spectators.filter((spectator) => {
        return user.id.toString() !== spectator.toString();
      });

      await user.save();
      await match.save();
    }
  };

  static handleDeleteReservation = async (seats, user, match) => {
    await Reservation.deleteMany({
      seatIndex: { $in: seats },
      matchId: match.id,
    });

    await this.deleteMatchFromUser(user, match);
  };

  static getReservation = async (reservation) => {
    const existingReservation = await Reservation.findOne({
      seatIndex: reservation.seatIndex,
      matchId: reservation.matchId,
    });
    return existingReservation;
  };

  static validateReservation = async (reservation) => {
    const isReservationExisting = await this.getReservation(reservation);
    if (isReservationExisting)
      errorHandlingUtils.throwError(
        `Seat ${reservation.seatIndex} is already taken`,
        400
      );
  };

  static createReservation = async (reservation) => {
    let ticketNumber = await this.getTicketNumber();
    const newReservation = await Reservation({
      ticketNumber: ticketNumber,
      reservationDate: reservation.date,
      customerId: reservation.customerId,
      matchId: reservation.matchId,
      seatIndex: reservation.seatIndex,
    }).save();
    return newReservation;
  };

  static checkOnSeat = (stadium, seatIndex) => {
    if (stadium.seatsPerRow * stadium.numberOfRows <= seatIndex) return false;
    if (seatIndex < 0) return false;
    return true;
  };

  static validateSeat = (stadium, seatIndex) => {
    if (!this.checkOnSeat(stadium, seatIndex))
      errorHandlingUtils.throwError(
        `Seat ${seatIndex} isn't available in the stadium`,
        400
      );
  };

  static finalizeReservationCreation = async (reservationBody, user, match) => {
    const reservation = await this.createReservation(reservationBody);
    await addUserMatch(user, match.id);
    await addMatchSpectator(match, user);
    return reservation;
  };

  static socketsValidateSeat = (stadium, seatIndex, io) => {
    if (!this.checkOnSeat(stadium, seatIndex)) {
      io.emit(
        "reservationError",
        `Seat Number ${seatIndex} doesn't exist in the stadium`
      );
    }
  };

  static socketsValidateReservation = async (reservation, io) => {
    const isReservationExisting = await this.getReservation(reservation);
    if (isReservationExisting) {
      io.emit("reservationError", `this seat is already taken`);
    }
  };

  static socketsReservation = async (reservation, io) => {
    const payload = AuthServices.getPayload({
      headers: { authorization: reservation.token },
    });
    try {
      const user = await checkUserServices.getUserByUsername(payload.username);
      const match = await getMatchById(reservation.matchId);
      for (let seat of reservation.seats) {
        this.socketsValidateSeat(match.venueId, reservation.seatIndex, io);

        let reservationObject = {
          date: reservation.date,
          customerId: payload.userId,
          matchId: reservation.matchId,
          seatIndex: seat,
        };

        await this.validateReservation(reservationObject);
        await reservationServices.finalizeReservationCreation(
          reservationObject,
          user,
          match
        );
      }

      io.emit("reserveSeat", {
        seats: reservation.seats,
        match: reservation.matchId,
      });
    } catch (error) {
      console.log(error);
      io.emit("reservationError", `Cannot reserve the seat`);
    }
  };
}

export default reservationServices;
