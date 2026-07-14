import { body } from "express-validator";
const reviewsValidation = [
    body('comment')
        .trim()
        .notEmpty()
        .withMessage('Review comment is required.')
        .isLength({ min: 5 })
        .withMessage('Review must be at least 5 characters long.')
];

export { reviewsValidation};