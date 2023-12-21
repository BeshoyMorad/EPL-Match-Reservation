import { validationResult } from "express-validator";

export function validateRequestSchema(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let error = [];
    for (let i = 0; i < result.array().length; i++) {
      error.push(result.array()[i].msg);
    }

    return res.status(400).json({ error });
  }
  next();
}
