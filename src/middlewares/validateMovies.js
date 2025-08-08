import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateMovies = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title length must have less than 100 caracters"),
  body("director")
    .trim()
    .notEmpty()
    .withMessage("Director is required")
    .isLength({ max: 100 })
    .withMessage("Director length must have less than 100 caracters"),
  body("release_year")
    .trim()
    .notEmpty()
    .withMessage("Release year is required")
    .isInt({ min: 1900, max: 2030 })
    .withMessage("Release year must be between 1900 & 2030"),
  handleValidationErrors,
];
