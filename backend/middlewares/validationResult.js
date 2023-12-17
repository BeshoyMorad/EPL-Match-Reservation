import { validationResult } from "express-validator";

export function validateRequestSchema(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let errors = [];
    for (let i = 0; i < result.array().length; i++) {
      errors.push(result.array()[i].msg);
    }

    return res.status(400).json({ errors });
  }
  next();
}
