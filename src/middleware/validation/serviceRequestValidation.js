import { body, param } from 'express-validator';

const currentYear = new Date().getFullYear();

const serviceRequestValidation = [
    body('vehicleMake')
        .trim()
        .notEmpty()
        .withMessage('Vehicle make is required.')
        .isLength({ min: 2, max: 50 })
        .withMessage('Vehicle make must be between 2 and 50 characters.'),

    body('vehicleModel')
        .trim()
        .notEmpty()
        .withMessage('Vehicle model is required.')
        .isLength({ min: 1, max: 50 })
        .withMessage('Vehicle model must be between 1 and 50 characters.'),

    body('vehicleYear')
        .trim()
        .notEmpty()
        .withMessage('Vehicle year is required.')
        .isInt({ min: 1900, max: currentYear + 1 })
        .withMessage(
            `Vehicle year must be between 1900 and ${currentYear + 1}.`
        ),

    body('serviceDescription')
        .trim()
        .notEmpty()
        .withMessage('Service description is required.')
        .isLength({ min: 10, max: 2000 })
        .withMessage(
            'Service description must be between 10 and 2000 characters.'
        )
];

const serviceRequestIdValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Invalid service request ID.')
];

const statusUpdateValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Invalid service request ID.'),

    body('statusId')
        .notEmpty()
        .withMessage('A service request status is required.')
        .isInt({ min: 1 })
        .withMessage('Invalid service request status.')
];

const serviceRequestNoteValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Invalid service request ID.'),

    body('note')
        .trim()
        .notEmpty()
        .withMessage('A note is required.')
        .isLength({ min: 2, max: 2000 })
        .withMessage('The note must be between 2 and 2000 characters.')
];

export {
    serviceRequestValidation,
    serviceRequestIdValidation,
    statusUpdateValidation,
    serviceRequestNoteValidation
};