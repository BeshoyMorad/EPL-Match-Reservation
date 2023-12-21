import { body, check } from "express-validator";

class stadiumValidator {
  static createStadium = [
    body("stadiumName")
      .not()
      .isEmpty()
      .withMessage("stadiumName must not be empty")
      .trim()
      .escape(),
    body("numberOfRows")
      .not()
      .isEmpty()
      .withMessage("numberOfRows must not be empty")
      .isNumeric()
      .withMessage("numberOfRows must be integer"),
    body("seatsPerRow")
      .not()
      .isEmpty()
      .withMessage("seatsPerRow must not be empty")
      .isNumeric()
      .withMessage("numberOfRows must be integer"),
  ];
}

export default stadiumValidator