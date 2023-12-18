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

export async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

export async function verifyUser(user) {
  if (user.approved) {
    const error = new Error("User is already approved");
    error.statusCode = 400;
    throw error;
  }
  user.approved = true;
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

export async function authenticateAdmin(username, password) {
  const admin = await Admin.findOne({ username: username });
  if (!admin) return null;
  const doMatch = comparePasswords(password, admin.password);
  if (!doMatch) {
    const error = new Error("Invalid admin password");
    error.statusCode = 400;
    throw error;
  }
  return admin;
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
    email: userDetails.email,
    password: hashedPassword,
    role: userDetails.role,
    address: userDetails.address,
    city: userDetails.city,
    gender: userDetails.gender,
    birthDate: userDetails.birthDate,
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

export async function checkOldPassword(userId, password) {
  const user = await User.findById(userId);
  const doMatch = comparePasswords(password, user.password);
  if (!doMatch) {
    const error = new Error("Old password is incorrect");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

export async function updatePassword(user, newPassword) {
  const hashedPassword = hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
}

export async function updateUser(user, body) {
  user.firstName = body.firstName ?? user.firstName;
  user.lastName = body.lastName ?? user.lastName;
  user.gender = body.gender ?? user.gender;
  user.address = body.address ?? user.address;
  user.city = body.city ?? user.city;
  user.birthDate = body.birthDate ?? user.birthDate;
  await user.save();
}
