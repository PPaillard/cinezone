import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 & 100 caracters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format invalid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 10 })
    .withMessage("Password must have at least 10 caracters"),
  handleValidationErrors,
];
