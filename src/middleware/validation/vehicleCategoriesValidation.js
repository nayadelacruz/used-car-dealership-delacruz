import { body } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Category name must be between 2 and 100 characters')
];

export { categoryValidation };
