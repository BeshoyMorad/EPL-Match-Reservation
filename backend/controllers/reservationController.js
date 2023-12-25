import checkUserServices from "../services/checkUserServices.js";
import { getMatchById } from "../services/matchServices.js";
import reservationServices from "../services/reservationServices.js";
import stadiumServices from "../services/stadiumServices.js";
import { addUserMatch, addUserReservation } from "../services/userServices.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class reservationController {
  static addReservation = async (req, res) => {
    try {
      const user = await checkUserServices.getUserByUsername(
        req.payload.username
      );
      req.body.customerId = req.payload.userId;
      req.user = user;
      const match = await getMatchById(req.body.matchId);
      req.match = match;
      req.badSeats = [];
      let isError = false;
      for (let seat of req.body.seats) {
        if (!reservationServices.checkOnSeat(match.venueId, seat)) {
          isError = true;
          continue;
        }
        req.body.seatIndex = seat;

        const isReservationExisting = await reservationServices.getReservation(
          req.body
        );
        if (isReservationExisting) {
          isError = true;
          continue;
        }

        await reservationServices.finalizeReservationCreation(
          req.body,
          user,
          match
        );
        req.badSeats.push(seat);
      }
      if (isError)
        errorHandlingUtils.throwError(
          "There was an error while reserving the seats",
          400
        );
      res.status(201).json(req.body.seats);
    } catch (error) {
      await reservationServices.handleDeleteReservation(
        req.badSeats,
        req.user,
        req.match
      );
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default reservationController;
