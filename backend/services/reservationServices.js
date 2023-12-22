import Reservation from "../models/Reservation.js";

class reservationServices {
  static generateTimestampBasedID = () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    return `${timestamp}-${counter++}`;
  };

  static createReservation = async (reservation) => {
    let newTicketNumber = this.generateTimestampBasedID;
    const newReservation = await new Reservation({
      ticketNumber: newTicketNumber,
      reservationDate: reservation.date,
      customerId: reservation.customerId,
      matchId: reservation.matchId,
      seatIndex: reservation.seatIndex,
    });
    return newReservation;
  };
}

export default reservationServices;
