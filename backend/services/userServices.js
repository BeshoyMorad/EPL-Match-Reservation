import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";
import User from "../models/User.js";

export async function getUserByUsername(username) {
  const user = await User.findOne({ username: username });
  if (!user) {
    const error = new Error("Username not found");
    error.statusCode = 400;
    throw error;
  }
  return user;
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
