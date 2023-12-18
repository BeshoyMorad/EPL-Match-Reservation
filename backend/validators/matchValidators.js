import { body, check } from "express-validator";

export const createMatchValidator = [
  body(["homeTeamId", "awayTeamId"])
    .not()
    .isEmpty()
    .withMessage("Home/Away Team ID can't be empty")
    .trim()
    .escape(),
  body("venueId")
    .not()
    .isEmpty()
    .withMessage("Venue ID can't be empty")
    .trim()
    .escape(),
  body("dateAndTime")
    .not()
    .isEmpty()
    .withMessage("Date and Time must be filled")
    .isDate()
    .withMessage("Invalid date format"),
  body("mainReferee")
    .not()
    .isEmpty()
    .withMessage("Referee name must be filled")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Referee name must be in letters only"),
  body(["firstLinesman", "secondLinesman"])
    .not()
    .isEmpty()
    .withMessage("First and second linesmen names must be filled")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Linesman name must be in letters only"),
];

export const editUserValidator = [
  body("dateAndTime").optional().isDate().withMessage("Invalid date format"),
  body("mainReferee")
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Referee name should consist of letters only"),
  body("city")
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("City must consist of letters only"),
  body(["firstLinesman", "secondLinesman"])
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Linesmen names must consist of letters only"),
];
