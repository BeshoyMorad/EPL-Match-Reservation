import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

export async function getUserByUsername(username) {
  const user = await User.findOne({ username: username });
  if (!user) {
    const error = new Error("Username not found");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

export async function verifyUser(user) {
  if (user.verified) {
    const error = new Error("User is already verified");
    error.statusCode = 400;
    throw error;
  }
  user.verified = true;
  await user.save();
}

export async function deleteUser(username) {
  const deletedUser = await User.findOneAndDelete({ username: username });
  if (!deletedUser) {
    const error = new Error("Username not found");
    error.statusCode = 400;
    throw error;
  }
}

export async function getAdminById(adminId) {
  const admin = await Admin.findById(adminId);
  if (!admin) {
    const error = new Error("This user is not an admin");
    error.statusCode = 400;
    throw error;
  }
  return admin;
}

export async function authenticateUser(username, password) {
  const user = await getUserByUsername(username);
  const doMatch = comparePasswords(password, user.password);
  if (!doMatch) {
    const error = new Error("Invalid password");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

export async function checkConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.statusCode = 400;
    throw error;
  }
}

export async function checkExistingUsername(username) {
  const user = await User.findOne({ username: username });
  if (user) {
    const error = new Error("Username already exists");
    error.statusCode = 400;
    throw error;
  }
}

export async function createNewUser(userDetails) {
  const hashedPassword = hashPassword(userDetails.password);
  const newUser = new User({
    username: userDetails.username,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    password: hashedPassword,
    role: userDetails.role,
  });
  await newUser.save();
  return newUser;
}

export async function checkUserRole(username, role) {
  const user = await getUserByUsername(username);
  if (user.role !== role) {
    const error = new Error(`User is not a ${role}`);
    error.statusCode = 400;
    throw error;
  }
}
