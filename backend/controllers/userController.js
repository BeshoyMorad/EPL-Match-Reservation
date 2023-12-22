import checkUserServices from "../services/checkUserServices.js";
import stadiumServices from "../services/stadiumServices.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class userController {
  static getReservation = async (req, res) => {
    try {
      const user = checkUserServices.getUserByUsername(req.payload.username);
      const reservation = user.reservation;
    } catch (error) {
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default userController;
