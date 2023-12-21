import User from "../models/User.js";
import errorHandlingUtils from "../utils/errorHandlingUtils.js";

class checkUserServices {
  static isFan = async (username) => {
    const user = await User.findOne({ username: username });
    if (user.role !== "fan")
      errorHandlingUtils.throwError(
        "You aren't fan, you are not allowed to do this",
        401
      );
    return user;
  };

  static isManager = async (username) => {
    const user = await User.findOne({ username: username });
    if (user.role !== "manager")
      errorHandlingUtils.throwError(
        "You aren't manager, you are not allowed to do this",
        401
      );
    return user;
  };
}

export default checkUserServices;
