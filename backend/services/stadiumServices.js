import Stadium from "../models/Stadium.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class stadiumServices {
  static createStadium = async ( body ) =>
  {
    if ( body.numberOfRows > 10 )
    {
      errorHandlingUtils.throwError("Number Of rows must be less than 10",400)
    }
    if (body.seatsPerRow > 10) {
      errorHandlingUtils.throwError("Number Of columns must be less than 10", 400);
    }
    const stadium = await new Stadium({
      name: body.stadiumName,
      numberOfRows: body.numberOfRows,
      seatsPerRow: body.seatsPerRow,
      createdAt: Date.now(),
    }).save();
    return stadium.id;
  };

  static getStadiums = async () => {
    return await Stadium.find();
  };

  static getStadiumByName = async (name) => {
    let stadium = await Stadium.findOne({ name: name });
    if (!stadium)
      errorHandlingUtils.throwError("This Stadium isn't found", 404);
    return stadium;
  };

  static getStadiumById = async (stadiumId) => {
    let stadium = await Stadium.findById(stadiumId);
    if (!stadium)
      errorHandlingUtils.throwError("This Stadium isn't found", 404);
    return stadium;
  };

  static checkStadiumName = async (stadiumName) => {
    const stadium = await Stadium.findOne({ name: stadiumName });
    if (stadium)
      errorHandlingUtils.throwError("Stadium Name is already taken", 400);
  };
}
export default stadiumServices;
