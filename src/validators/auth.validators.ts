import { body } from "express-validator"

export const registerValidator = [
    body("email").isEmail().withMessage("Email is not valid"),

    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 char")
        .isLength({ max: 128 }).withMessage('Password cant be more than 128 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),

    body("name").isLength({min:1}).withMessage("Name is required")


]