import checkUserServices from "../services/checkUserServices.js";
import {
  getMatchById,
} from "../services/matchServices.js";
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
      const match = await getMatchById(req.body.matchId);
      reservationServices.validateSeat(match.venueId, req.body.seatIndex);
      await reservationServices.validateReservation(req.body);

      const reservation = await reservationServices.finalizeReservationCreation(
        req.body,
        user,
        match
      );
      res.status(201).json(reservation);
    } catch (error) {
      console.log(error);
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default reservationController;
