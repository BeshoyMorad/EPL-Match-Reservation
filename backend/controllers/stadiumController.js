import checkUserServices from "../services/checkUserServices.js";
import stadiumServices from "../services/stadiumServices.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class stadiumController {
  static createStadium = async (req, res) => {
    try {
      await stadiumServices.checkStadiumName(req.body.stadiumName);
      const user = await checkUserServices.isManager(req.payload.username);
      const stadiumId = await stadiumServices.createStadium(req.body);
      res.status(201).json({
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

  static getStadiums = async (req, res) => {
    try {
      const user = await checkUserServices.isManager(req.payload.username);
      const stadiums = await stadiumServices.getStadiums();
      res.status(200).json({
        response: "Returned Successfully",
        Message: "Stadiums Have been returned successfully",
        stadiums,
      });
    } catch (error) {
      console.log(error);
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };

  static getStadium = async (req, res) => {
    try {
      const user = await checkUserServices.isManager(req.payload.username);
      const stadium = await stadiumServices.getStadiumById(
        req.params.stadiumId
      );
      res.status(200).json({
        response: "Returned Successfully",
        Message: "Stadium has been returned successfully",
        stadium,
      });
    } catch (error) {
      console.log(error);
      let formattedError = errorHandlingUtils.formatError(error);
      res
        .status(formattedError.statusCode)
        .json({ response: "Operation failed", error: formattedError.message });
    }
  };
}

export default stadiumController;
