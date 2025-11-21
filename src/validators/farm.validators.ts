import { body } from "express-validator";

export const createFarmValidator = [
    body("farmName")
        .isString().withMessage("Farm name must be a string")
        .isLength({ min: 1 }).withMessage("Farm name is required"),

    body("ownerName")
        .isString().withMessage("Owner name must be a string")
        .isLength({ min: 1 }).withMessage("Owner name is required"),

    body("location")
        .isString().withMessage("Location must be a string")
        .isLength({ min: 1 }).withMessage("Location is required"),

  body("isPartner")
    .isBoolean().withMessage("isPartner must be a boolean")
    .toBoolean(),
];

export const updateFarmValidator = [
    body("farmName")
        .optional()
        .isString().withMessage("Farm name must be a string")
        .isLength({ min: 1 }).withMessage("Farm name cannot be empty"),

    body("ownerName")
        .optional()
        .isString().withMessage("Owner name must be a string")
        .isLength({ min: 1 }).withMessage("Owner name cannot be empty"),

    body("location")
        .optional()
        .isString().withMessage("Location must be a string")
        .isLength({ min: 1 }).withMessage("Location cannot be empty"),

  body("isPartner")
    .optional()
    .isBoolean().withMessage("isPartner must be a boolean")
    .toBoolean(),
];
