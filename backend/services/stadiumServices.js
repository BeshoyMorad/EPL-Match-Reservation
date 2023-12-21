import Stadium from "../models/Stadium.js";

class stadiumServices {
  static createStadium = async (body) => {
    const stadium = await new Stadium({
      name: body.stadiumName,
      numberOfRows: body.numberOfRows,
      seatsPerRow: body.seatsPerRow,
    }).save();
    return stadium.id;
  };
}
export default stadiumServices;
