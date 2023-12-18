import {
  authenticateUser,
  checkConfirmPassword,
  checkExistingUsername,
  createNewUser,
  getAdminById,
  getUserByUsername,
  verifyUser,
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
    await checkExistingUsername(username);
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

const approveUser = async (req, res) => {
  try {
    const { username } = req.body;
    const adminId = req.payload.userId;
    await getAdminById(adminId);
    const user = getUserByUsername(username);
    await verifyUser(user);
    return res.status(201).json("User approved successfully");
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const removeUser = async (req, res) => {
  try {
    const { username } = req.body;
    const adminId = req.payload.userId;
    await getAdminById(adminId);
    await deleteUser(username);
    return res.status(201).json("User removed successfully");
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
  approveUser,
  removeUser,
};

export default authController;
