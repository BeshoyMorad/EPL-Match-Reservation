import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export async function getAdminById(adminId) {
  const admin = await Admin.findById(adminId);
  if (!admin) {
    const error = new Error("This user is not an admin");
    error.statusCode = 400;
    throw error;
  }
  return admin;
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

export async function createNewAdmin(adminDetails) {
  const hashedPassword = hashPassword(adminDetails.password);
  const newAdmin = new Admin({
    username: adminDetails.username,
    password: hashedPassword,
    firstName: adminDetails.firstName,
    lastName: adminDetails.lastName,
    email: adminDetails.email,
  });
  await newAdmin.save();
  return newAdmin;
}

export async function retrieveUsers(unverified = false) {
  filter = unverified ? { approved: false } : {};
  const users = await User.find(filter).sort({ createdAt: -1 }).exec();
  return users;
}

export async function retrieveUsersCount() {
  const count = await User.countDocuments();
  return count;
}
