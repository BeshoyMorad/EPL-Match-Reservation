import jwt from "jsonwebtoken";
import { getUserById } from "../services/userServices.js";
import AuthServices from "../services/AuthServices.js";

export function verifyAuthToken(req, res, next) {
  try {
    req.payload = AuthServices.getPayload(req);
    next();
  } catch (err) {
    res.status(401).json("Invalid Token");
  }
}

export async function verifyApprovedUser(req, res, next) {
  try {
    const userId = req.payload?.userId;
    const user = await getUserById(userId);
    if (!user || !user.approved) throw new Error("Not approved");
    next();
  } catch (err) {
    res.status(401).json("User is not yet approved");
  }
}
