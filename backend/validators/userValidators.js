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

export const resetPasswordValidator = [
  body(["oldPassword", "newPassword", "confirmPassword"])
    .isLength({ min: 8 })
    .withMessage("All passwords must be at least 8 characters long"),
];

export const usernameValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .escape(),
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
    .withMessage("Both passwords must be at least 8 characters long"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
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
  body("city")
    .not()
    .isEmpty()
    .withMessage("City can't be empty")
    .isString()
    .withMessage("City must consist of letters only"),
  body("birthDate")
    .not()
    .isEmpty()
    .withMessage("Birth Date can't be empty")
    .isISO8601({ strict: true, toDate: "date" })
    .withMessage("Invalid birth date format"),
  body("address")
    .optional()
    .isString()
    .withMessage("Address must be only letters & numbers"),
  body("role").trim().not().isEmpty().withMessage("Role cannot be empty"),
  check("role")
    .isIn(["manager", "fan"])
    .withMessage("User role must be either 'manager' or 'fan'"),
  body("gender").trim().not().isEmpty().withMessage("Gender cannot be empty"),
  check("gender")
    .isIn(["male", "female"])
    .withMessage("Gender must be either 'male' or 'female'"),
];

export const editUserValidator = [
  body("firstName")
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("First name should consist of letters only"),
  body("lastName")
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Last name should consist of letters only"),
  body("city")
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("City must consist of letters only"),
  body("birthDate")
    .optional()
    .isDate()
    .withMessage("Invalid birth date format"),
  body("address")
    .optional()
    .isAlphanumeric()
    .withMessage("Address must be only letters & numbers"),
  check("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Gender must be either 'male' or 'female'"),
];

export const createAdminValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username can't be empty")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username should consist of letters and numbers only"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Both passwords must be at least 8 characters long"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
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
];
