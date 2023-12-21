import checkUserServices from "../services/checkUserServices.js";
import stadiumServices from "../services/stadiumServices.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class stadiumController {
  static createStadium = async (req, res) => {
    try {
      const user = await checkUserServices.isManager(req.body.username);
      const stadiumId = await stadiumServices.createStadium(req.body);
      res
        .status(201)
        .json({
          response: "Created Successfully",
          Message: "Stadium Has been created successfully",
          stadiumId,
        });
    } catch (error) {
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default stadiumController;
