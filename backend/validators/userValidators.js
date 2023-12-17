import { body, check } from "express-validator";

export const loginValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const signupValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username can't be empty")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username should consist of letters and numbers only"),
  body(["password", "confirmPassword"])
    .isLength({ min: 8 })
    .withMessage("Passwords must be at least 8 characters long"),
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First Name can't be empty")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("First name should consist of letters only"),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name can't be empty")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Last name should consist of letters only"),
  body("role").trim().not().isEmpty().withMessage("Role cannot be empty"),
  check("role")
    .isIn(["manager", "fan"])
    .withMessage("User role must be either 'manager' or 'fan'"),
];
