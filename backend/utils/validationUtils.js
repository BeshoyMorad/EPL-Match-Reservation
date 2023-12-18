import mongoose from "mongoose";

export function checkValidId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid ObjectId");
    error.statusCode = 400;
    throw error;
  }
}
