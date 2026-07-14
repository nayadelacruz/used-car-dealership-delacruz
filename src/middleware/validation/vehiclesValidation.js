import { body } from 'express-validator';

const addVehicleValidation = [
    body('make')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Make must be between 2 and 50 characters'),

    body('model')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Model must be between 1 and 50 characters'),

    body('year')
        .isInt({ min: 1900, max: 2100 })
        .withMessage('Please enter a valid model year'),

    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('mileage')
        .isInt({ min: 0 })
        .withMessage('Mileage must be a positive whole number'),

    body('categoryId')
        .notEmpty()
        .withMessage('Please select a category'),

    body('transmission')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Transmission is required'),

    body('drivetrain')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Drivetrain is required'),

    body('fuelType')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Fuel type is required'),

    body('engine')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Engine is required'),

    body('horsepower')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Horsepower must be a positive number'),

    body('exteriorColor')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Exterior color is required'),

    body('interiorColor')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Interior color is required'),

    body('vin')
        .trim()
        .isLength({ min: 11, max: 20 })
        .withMessage('VIN must be between 11 and 20 characters'),

    body('stockNumber')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Stock number is required'),

    body('description')
        .trim()
        .isLength({ min: 20, max: 5000 })
        .withMessage('Description must be between 20 and 5000 characters'),

    body('availability')
        .isIn(['true', 'false'])
        .withMessage('Please select the availability'),

    body('featured')
        .isIn(['true', 'false'])
        .withMessage('Please select whether the vehicle is featured'),

    body('frontImageUrl')
        .trim()
        .isURL()
        .withMessage('Front image must be a valid URL'),

    body('sideImageUrl')
        .trim()
        .isURL()
        .withMessage('Side image must be a valid URL'),

    body('interiorImageUrl')
        .trim()
        .isURL()
        .withMessage('Interior image must be a valid URL')
];

const editVehicleValidation = [
    body('make')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Make must be between 2 and 50 characters'),

    body('model')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Model must be between 1 and 50 characters'),

    body('year')
        .isInt({ min: 1900, max: 2100 })
        .withMessage('Year must be valid'),

    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('mileage')
        .isInt({ min: 0 })
        .withMessage('Mileage must be a positive number'),

    body('categoryId')
        .notEmpty()
        .withMessage('Category is required'),

    body('transmission')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Transmission is required'),

    body('drivetrain')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Drivetrain is required'),

    body('fuelType')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Fuel type is required'),

    body('engine')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Engine is required'),

    body('horsepower')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Horsepower must be a positive number'),

    body('exteriorColor')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Exterior color is required'),

    body('interiorColor')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Interior color is required'),

    body('vin')
        .trim()
        .isLength({ min: 11, max: 20 })
        .withMessage('VIN must be between 11 and 20 characters'),

    body('stockNumber')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Stock number is required'),

    body('description')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),

    body('availability')
        .isIn(['true', 'false'])
        .withMessage('Please select the availability'),

    body('featured')
        .isIn(['true', 'false'])
        .withMessage('Please select whether the vehicle is featured')
];

export { addVehicleValidation, editVehicleValidation };
