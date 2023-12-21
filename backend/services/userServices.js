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

export function checkAuthority(user) {
  if (!user.approved) {
    const error = new Error("User is not yet authorized");
    error.statusCode = 400;
    throw error;
  }
}

export async function deleteUser(username) {
  const deletedUser = await User.findOneAndDelete({ username: username });
  if (!deletedUser) {
    const error = new Error("Username not found");
    error.statusCode = 400;
    throw error;
  }
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
  const admin = await Admin.findOne({ username: username });
  if (user || admin) {
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
  const doMatch = comparePasswords(newPassword, user.password);
  if (doMatch) {
    const error = new Error("New password is the same as the old one");
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
}

export async function updateUser(user, body) {
  for (const key in body) {
    user[key] = body[key];
  }
  await user.save();
}

export async function addMatchToUser(user, matchId) {
  user.matches.push({ matchId: matchId });
  await user.save();
}

export async function removeMatchFromUser(user, matchId) {
  const matchIndex = user.matches.findIndex(
    (match) => match.matchId.toString() === matchId.toString()
  );
  if (matchIndex === -1) {
    const error = new Error("Match not found");
    error.statusCode = 400;
    throw error;
  }
  user.matches.splice(matchIndex, 1);
  await user.save();
}

export async function addReservationToUser(user, reservationId) {
  user.reservations.push({ reservationId: reservationId });
  await user.save();
}

export async function removeReservationFromUser(user, reservationId) {
  const reservationIndex = user.reservations.findIndex(
    (reservation) =>
      reservation.reservationId.toString() === reservationId.toString()
  );
  if (reservationIndex === -1) {
    const error = new Error("Reservation not found");
    error.statusCode = 400;
    throw error;
  }
  user.reservations.splice(reservationIndex, 1);
  await user.save();
}

export async function addUserReservation(user, reservation) {
  user.reservations.push({ reservationId: reservation._id });
  await user.save();
}

export async function addUserMatch(user, matchId) {
  user.matches.push({ matchId: matchId });
  await user.save();
}
