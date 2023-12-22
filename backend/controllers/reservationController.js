import checkUserServices from "../services/checkUserServices.js";
import { addMatchReservation, getMatchById } from "../services/matchServices.js";
import reservationServices from "../services/reservationServices.js";
import { addUserMatch, addUserReservation } from "../services/userServices.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class reservationController {
  static addReservation = async (req, res) => {
    try {
      const user = checkUserServices.getUserByUsername(req.payload.username);
      const match = await getMatchById(req.body.getMatchById)
      await reservationServices.validateReservation(req.body);
      const reservation = await reservationServices.createReservation(req.body);
      await addMatchReservation(match,reservation)
      await addUserReservation(user,reservation)
      res.status(201).json(reservation);
    } catch (error) {
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default reservationController;
