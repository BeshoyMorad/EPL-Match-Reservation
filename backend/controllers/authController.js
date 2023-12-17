import {
  authenticateUser,
  checkConfirmPassword,
  createNewUser,
} from "../services/userServices.js";
import { generateJWT } from "../utils/tokenUtils.js";

const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await authenticateUser(username, password);
    const token = generateJWT(user);
    return res.status(200).json({
      username: username,
      token: token,
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const signup = async (req, res) => {
  try {
    const { username, firstName, lastName, password, confirmPassword, role } =
      req.body;
    await checkConfirmPassword(password, confirmPassword);
    const user = await createNewUser({
      username,
      firstName,
      lastName,
      password,
      role,
    });
    const token = generateJWT(user);
    return res.status(201).json({
      username: username,
      token: token,
    });
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const authController = {
  login,
  signup,
};

export default authController;
