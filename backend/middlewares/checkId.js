import mongoose from "mongoose";

export function checkId(req, res, next) {
  const paramId = req.params.id;

  if (paramId) {
    if (!mongoose.Types.ObjectId.isValid(paramId)) {
      return res.status(400).json({
        error: "Invalid id",
      });
    }
  }
  next();
}
