import Reservation from "../models/Reservation.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";
import { addMatchReservation, addMatchSpectator } from "./matchServices.js";
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
      errorHandlingUtils.throwError("This Seat is already taken", 400);
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
      errorHandlingUtils.throwError("This seat isn't available in the stadium",400);
  };

  static finalizeReservationCreation = async (reservationBody, user, match) => {
    const reservation = await this.createReservation(reservationBody);
    await addUserMatch(user, match.id);
    await addUserReservation(user, reservation);
    await addMatchReservation(match, reservation);
    await addMatchSpectator(match, user);
    return reservation;
  };
}

export default reservationServices;
