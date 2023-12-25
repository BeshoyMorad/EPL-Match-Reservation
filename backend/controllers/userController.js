import Reservation from "../models/Reservation.js";
import checkUserServices from "../services/checkUserServices.js";
import reservationServices from "../services/reservationServices.js";
import stadiumServices from "../services/stadiumServices.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class userController {
  static getReservation = async (req, res) => {
    try {
      const user = await checkUserServices.getUserByUsername(
        req.payload.username
      );
      const reservations = await reservationServices.getUserReservations(
        req.params.matchId,
        user
      );
      res.status(200).json(reservations);
    } catch (error) {
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default userController;
