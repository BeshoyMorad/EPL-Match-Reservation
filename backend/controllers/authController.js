import {
  authenticateAdmin,
  authenticateUser,
  checkConfirmPassword,
  checkExistingUsername,
  checkOldPassword,
  createNewUser,
  getAdminById,
  getUserById,
  getUserByUsername,
  updatePassword,
  updateUser,
  verifyUser,
} from "../services/userServices.js";
import { generateJWT } from "../utils/tokenUtils.js";

const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const admin = await authenticateAdmin(username, password);
    const user = admin ?? (await authenticateUser(username, password));
    const token = generateJWT(user);
    const isAdmin = admin !== null;
    return res.status(200).json({
      username: username,
      token: token,
      isAdmin: isAdmin,
      approved: isAdmin ? undefined : user.approved,
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
    const {
      username,
      firstName,
      lastName,
      password,
      confirmPassword,
      role,
      email,
      gender,
      city,
      birthDate,
      address,
    } = req.body;
    await checkConfirmPassword(password, confirmPassword);
    await checkExistingUsername(username);
    const user = await createNewUser({
      username,
      firstName,
      lastName,
      password,
      role,
      email,
      gender,
      city,
      birthDate,
      address,
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
    return res.status(200).json("User approved successfully");
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
    return res.status(204).json("User removed successfully");
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.payload.userId;
    await checkConfirmPassword(newPassword, confirmPassword);
    const user = await checkOldPassword(userId, oldPassword);
    await updatePassword(user, newPassword);
    return res.status(200).json("Password updated successfully");
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const user = await getUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getAdmin = async (req, res) => {
  try {
    const adminId = req.payload.userId;
    const admin = await getAdminById(adminId);
    return res.status(200).json(admin);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const user = await getUserById(userId);
    await updateUser(user, req.body);
    return res.status(200).json("User updated successfully");
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
  resetPassword,
  getUser,
  getAdmin,
  editUser,
};

export default authController;
